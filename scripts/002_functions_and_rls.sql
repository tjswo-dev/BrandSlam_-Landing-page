-- ============================================
-- SLAM GLOBAL - Functions & RLS Policies
-- ============================================

-- ============================================
-- 1. 정산 계산 함수 (승인 10개 = $10)
-- ============================================

-- 작업자의 정산 가능 금액 계산
CREATE OR REPLACE FUNCTION calculate_available_settlement(p_worker_id UUID)
RETURNS TABLE (
  total_approved INTEGER,
  settled_approved INTEGER,
  unsettled_approved INTEGER,
  settleable_units INTEGER,    -- 정산 가능한 10개 단위 수
  available_amount DECIMAL,    -- 정산 가능 금액
  pending_approvals INTEGER    -- 다음 정산까지 남은 승인 수
) AS $$
BEGIN
  RETURN QUERY
  WITH approval_stats AS (
    SELECT 
      COUNT(*) FILTER (WHERE status = 'approved') as total_approved,
      COUNT(*) FILTER (WHERE status = 'approved' AND is_settled = true) as settled_approved,
      COUNT(*) FILTER (WHERE status = 'approved' AND is_settled = false) as unsettled_approved
    FROM outreach_tasks
    WHERE worker_id = p_worker_id
  )
  SELECT 
    a.total_approved::INTEGER,
    a.settled_approved::INTEGER,
    a.unsettled_approved::INTEGER,
    (a.unsettled_approved / 10)::INTEGER as settleable_units,
    ((a.unsettled_approved / 10) * 10)::DECIMAL as available_amount,
    (10 - (a.unsettled_approved % 10))::INTEGER as pending_approvals
  FROM approval_stats a;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- 2. 정산 배치 생성 함수
-- ============================================
CREATE OR REPLACE FUNCTION create_settlement_batch(p_worker_id UUID)
RETURNS UUID AS $$
DECLARE
  v_unsettled_count INTEGER;
  v_settleable_units INTEGER;
  v_batch_id UUID;
  v_amount DECIMAL;
BEGIN
  -- 정산되지 않은 승인 건수 계산
  SELECT COUNT(*) INTO v_unsettled_count
  FROM outreach_tasks
  WHERE worker_id = p_worker_id 
    AND status = 'approved' 
    AND is_settled = false;
  
  -- 10개 단위로 계산
  v_settleable_units := v_unsettled_count / 10;
  
  IF v_settleable_units < 1 THEN
    RAISE EXCEPTION 'Not enough approved tasks for settlement. Need at least 10 approved tasks.';
  END IF;
  
  v_amount := v_settleable_units * 10.00;
  
  -- 정산 배치 생성
  INSERT INTO settlement_batches (worker_id, approved_count, amount, status)
  VALUES (p_worker_id, v_settleable_units * 10, v_amount, 'available')
  RETURNING id INTO v_batch_id;
  
  -- 해당 작업들을 정산 완료로 표시 (가장 오래된 것부터)
  UPDATE outreach_tasks
  SET 
    is_settled = true,
    settled_at = NOW(),
    settlement_batch_id = v_batch_id
  WHERE id IN (
    SELECT id FROM outreach_tasks
    WHERE worker_id = p_worker_id 
      AND status = 'approved' 
      AND is_settled = false
    ORDER BY reviewed_at ASC
    LIMIT (v_settleable_units * 10)
  );
  
  -- 작업자의 available_balance 업데이트
  UPDATE workers
  SET available_balance = available_balance + v_amount
  WHERE id = p_worker_id;
  
  RETURN v_batch_id;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- 3. 출금 요청 함수
-- ============================================
CREATE OR REPLACE FUNCTION request_withdrawal(
  p_worker_id UUID,
  p_amount DECIMAL
)
RETURNS UUID AS $$
DECLARE
  v_worker RECORD;
  v_withdrawal_id UUID;
BEGIN
  -- 작업자 정보 조회
  SELECT * INTO v_worker FROM workers WHERE id = p_worker_id;
  
  IF NOT FOUND THEN
    RAISE EXCEPTION 'Worker not found';
  END IF;
  
  -- 출금 가능 금액 확인
  IF v_worker.available_balance < p_amount THEN
    RAISE EXCEPTION 'Insufficient balance. Available: %, Requested: %', 
      v_worker.available_balance, p_amount;
  END IF;
  
  -- 은행 정보 확인
  IF v_worker.bank_name IS NULL OR v_worker.bank_account_number IS NULL THEN
    RAISE EXCEPTION 'Bank account information is required';
  END IF;
  
  -- 출금 요청 생성
  INSERT INTO withdrawals (
    worker_id, 
    amount, 
    bank_name, 
    bank_account_number, 
    bank_account_holder,
    status
  )
  VALUES (
    p_worker_id,
    p_amount,
    v_worker.bank_name,
    v_worker.bank_account_number,
    v_worker.bank_account_holder,
    'pending'
  )
  RETURNING id INTO v_withdrawal_id;
  
  -- 작업자 잔액 업데이트
  UPDATE workers
  SET 
    available_balance = available_balance - p_amount,
    pending_settlement = pending_settlement + p_amount
  WHERE id = p_worker_id;
  
  RETURN v_withdrawal_id;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- 4. 출금 완료 처리 함수 (관리자용)
-- ============================================
CREATE OR REPLACE FUNCTION complete_withdrawal(
  p_withdrawal_id UUID,
  p_transaction_id TEXT DEFAULT NULL
)
RETURNS BOOLEAN AS $$
DECLARE
  v_withdrawal RECORD;
BEGIN
  SELECT * INTO v_withdrawal FROM withdrawals WHERE id = p_withdrawal_id;
  
  IF NOT FOUND THEN
    RAISE EXCEPTION 'Withdrawal not found';
  END IF;
  
  IF v_withdrawal.status != 'pending' AND v_withdrawal.status != 'processing' THEN
    RAISE EXCEPTION 'Withdrawal is not in pending/processing status';
  END IF;
  
  -- 출금 완료 처리
  UPDATE withdrawals
  SET 
    status = 'completed',
    processed_at = NOW(),
    transaction_id = p_transaction_id
  WHERE id = p_withdrawal_id;
  
  -- 작업자 통계 업데이트
  UPDATE workers
  SET 
    pending_settlement = pending_settlement - v_withdrawal.amount,
    total_withdrawn = total_withdrawn + v_withdrawal.amount
  WHERE id = v_withdrawal.worker_id;
  
  -- 관련 정산 배치 상태 업데이트
  UPDATE settlement_batches
  SET 
    status = 'withdrawn',
    withdrawal_id = p_withdrawal_id
  WHERE worker_id = v_withdrawal.worker_id 
    AND status = 'available';
  
  RETURN TRUE;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- 5. 작업자 통계 갱신 함수
-- ============================================
CREATE OR REPLACE FUNCTION refresh_worker_stats(p_worker_id UUID)
RETURNS VOID AS $$
BEGIN
  UPDATE workers
  SET
    total_contacted = (
      SELECT COUNT(*) FROM outreach_tasks 
      WHERE worker_id = p_worker_id AND status != 'assigned'
    ),
    total_approved = (
      SELECT COUNT(*) FROM outreach_tasks 
      WHERE worker_id = p_worker_id AND status = 'approved'
    ),
    total_pending = (
      SELECT COUNT(*) FROM outreach_tasks 
      WHERE worker_id = p_worker_id AND status = 'pending'
    ),
    total_rejected = (
      SELECT COUNT(*) FROM outreach_tasks 
      WHERE worker_id = p_worker_id AND status = 'rejected'
    ),
    weekly_approved = (
      SELECT COUNT(*) FROM outreach_tasks 
      WHERE worker_id = p_worker_id 
        AND status = 'approved'
        AND reviewed_at >= date_trunc('week', CURRENT_DATE)
    ),
    monthly_approved = (
      SELECT COUNT(*) FROM outreach_tasks 
      WHERE worker_id = p_worker_id 
        AND status = 'approved'
        AND reviewed_at >= date_trunc('month', CURRENT_DATE)
    )
  WHERE id = p_worker_id;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- 6. 작업 상태 변경 트리거
-- ============================================
CREATE OR REPLACE FUNCTION on_outreach_task_status_change()
RETURNS TRIGGER AS $$
BEGIN
  -- 상태가 변경되면 작업자 통계 갱신
  IF OLD.status IS DISTINCT FROM NEW.status THEN
    PERFORM refresh_worker_stats(NEW.worker_id);
    
    -- 일일 배치 진행률 업데이트
    IF NEW.status = 'contacted' AND OLD.status = 'assigned' THEN
      UPDATE daily_batches
      SET total_contacted = total_contacted + 1
      WHERE worker_id = NEW.worker_id 
        AND batch_date = CURRENT_DATE;
    END IF;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_outreach_status_change
AFTER UPDATE ON outreach_tasks
FOR EACH ROW
EXECUTE FUNCTION on_outreach_task_status_change();

-- ============================================
-- 7. 랭킹 갱신 함수
-- ============================================
CREATE OR REPLACE FUNCTION refresh_worker_rankings()
RETURNS VOID AS $$
BEGIN
  -- 현재 랭킹 갱신
  WITH ranked_workers AS (
    SELECT 
      id,
      ROW_NUMBER() OVER (ORDER BY weekly_approved DESC, total_approved DESC) as new_rank
    FROM workers
    WHERE status = 'active'
  )
  UPDATE workers w
  SET current_rank = rw.new_rank
  FROM ranked_workers rw
  WHERE w.id = rw.id;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- RLS (Row Level Security) Policies
-- ============================================

-- Enable RLS on all tables
ALTER TABLE workers ENABLE ROW LEVEL SECURITY;
ALTER TABLE influencers ENABLE ROW LEVEL SECURITY;
ALTER TABLE outreach_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE settlement_batches ENABLE ROW LEVEL SECURITY;
ALTER TABLE withdrawals ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_batches ENABLE ROW LEVEL SECURITY;
ALTER TABLE brands ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE leaderboard_snapshots ENABLE ROW LEVEL SECURITY;

-- Workers: 자신의 정보만 조회/수정 가능
CREATE POLICY "Workers can view own profile" ON workers
  FOR SELECT USING (auth.uid()::text = id::text OR auth.uid() IS NULL);

CREATE POLICY "Workers can update own profile" ON workers
  FOR UPDATE USING (auth.uid()::text = id::text);

-- Influencers: 모든 작업자가 조회 가능
CREATE POLICY "Workers can view influencers" ON influencers
  FOR SELECT USING (true);

-- Outreach Tasks: 자신의 작업만 조회/수정 가능
CREATE POLICY "Workers can view own tasks" ON outreach_tasks
  FOR SELECT USING (auth.uid()::text = worker_id::text);

CREATE POLICY "Workers can update own tasks" ON outreach_tasks
  FOR UPDATE USING (auth.uid()::text = worker_id::text);

CREATE POLICY "Workers can insert own tasks" ON outreach_tasks
  FOR INSERT WITH CHECK (auth.uid()::text = worker_id::text);

-- Settlement Batches: 자신의 정산만 조회 가능
CREATE POLICY "Workers can view own settlements" ON settlement_batches
  FOR SELECT USING (auth.uid()::text = worker_id::text);

-- Withdrawals: 자신의 출금만 조회/요청 가능
CREATE POLICY "Workers can view own withdrawals" ON withdrawals
  FOR SELECT USING (auth.uid()::text = worker_id::text);

CREATE POLICY "Workers can insert own withdrawals" ON withdrawals
  FOR INSERT WITH CHECK (auth.uid()::text = worker_id::text);

-- Daily Batches: 자신의 배치만 조회 가능
CREATE POLICY "Workers can view own daily batches" ON daily_batches
  FOR SELECT USING (auth.uid()::text = worker_id::text);

-- Brands & Campaigns: 모든 작업자가 조회 가능
CREATE POLICY "Workers can view brands" ON brands
  FOR SELECT USING (true);

CREATE POLICY "Workers can view campaigns" ON campaigns
  FOR SELECT USING (true);

-- FAQs: 모든 사용자가 조회 가능
CREATE POLICY "Anyone can view FAQs" ON faqs
  FOR SELECT USING (is_active = true);

-- Leaderboard: 모든 작업자가 조회 가능
CREATE POLICY "Workers can view leaderboard" ON leaderboard_snapshots
  FOR SELECT USING (true);
