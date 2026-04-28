-- ============================================
-- SLAM GLOBAL Worker Platform Database Schema
-- ============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- 1. WORKERS (작업자) 테이블
-- ============================================
CREATE TABLE workers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  nickname TEXT,
  phone TEXT,
  profile_image_url TEXT,
  bank_name TEXT,
  bank_account_number TEXT,
  bank_account_holder TEXT,
  
  -- 작업 통계 (캐시용, 실제 계산은 outreach_tasks에서)
  total_contacted INTEGER DEFAULT 0,
  total_approved INTEGER DEFAULT 0,
  total_pending INTEGER DEFAULT 0,
  total_rejected INTEGER DEFAULT 0,
  
  -- 정산 관련
  available_balance DECIMAL(10, 2) DEFAULT 0.00, -- 출금 가능 금액
  total_withdrawn DECIMAL(10, 2) DEFAULT 0.00,   -- 총 출금 금액
  pending_settlement DECIMAL(10, 2) DEFAULT 0.00, -- 정산 대기 금액
  
  -- 랭킹 관련
  current_rank INTEGER,
  weekly_approved INTEGER DEFAULT 0,
  monthly_approved INTEGER DEFAULT 0,
  
  -- 상태
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'suspended')),
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 2. BRANDS (브랜드) 테이블
-- ============================================
CREATE TABLE brands (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  logo_url TEXT,
  category TEXT, -- skincare, makeup, haircare 등
  country TEXT DEFAULT 'KR',
  description TEXT,
  
  -- 캠페인 기본 설정
  default_script_template TEXT,
  guidelines_url TEXT,
  
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 3. CAMPAIGNS (캠페인) 테이블
-- ============================================
CREATE TABLE campaigns (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  brand_id UUID REFERENCES brands(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  
  -- 타겟 설정
  target_platform TEXT[] DEFAULT ARRAY['instagram', 'tiktok'], -- instagram, tiktok, youtube
  target_countries TEXT[] DEFAULT ARRAY['US'],
  min_followers INTEGER DEFAULT 1000,
  max_followers INTEGER,
  
  -- 기간
  start_date DATE,
  end_date DATE,
  
  -- 가이드라인
  script_template TEXT,
  guidelines TEXT,
  do_list TEXT[],
  dont_list TEXT[],
  
  -- 상태
  status TEXT DEFAULT 'active' CHECK (status IN ('draft', 'active', 'paused', 'completed')),
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 4. INFLUENCERS (인플루언서) 테이블
-- ============================================
CREATE TABLE influencers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  -- 기본 정보
  username TEXT NOT NULL,
  full_name TEXT,
  email TEXT,
  
  -- 플랫폼 정보
  platform TEXT NOT NULL CHECK (platform IN ('instagram', 'tiktok', 'youtube')),
  profile_url TEXT NOT NULL,
  profile_image_url TEXT,
  
  -- 통계
  followers_count INTEGER DEFAULT 0,
  following_count INTEGER DEFAULT 0,
  posts_count INTEGER DEFAULT 0,
  engagement_rate DECIMAL(5, 2),
  avg_likes INTEGER,
  avg_comments INTEGER,
  
  -- 지역/카테고리
  country TEXT,
  language TEXT,
  category TEXT[], -- beauty, skincare, lifestyle 등
  
  -- 연락처
  contact_email TEXT,
  contact_dm BOOLEAN DEFAULT true,
  
  -- 메타데이터
  bio TEXT,
  last_scraped_at TIMESTAMPTZ,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  UNIQUE(platform, username)
);

-- ============================================
-- 5. OUTREACH_TASKS (섭외 작업) 테이블
-- 작업자와 인플루언서를 연결하는 핵심 테이블
-- ============================================
CREATE TABLE outreach_tasks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  -- 관계
  worker_id UUID NOT NULL REFERENCES workers(id) ON DELETE CASCADE,
  influencer_id UUID NOT NULL REFERENCES influencers(id) ON DELETE CASCADE,
  campaign_id UUID REFERENCES campaigns(id) ON DELETE SET NULL,
  
  -- 작업 상태
  status TEXT DEFAULT 'assigned' CHECK (status IN (
    'assigned',      -- 배정됨
    'contacted',     -- 연락완료
    'pending',       -- 승인대기
    'approved',      -- 승인완료
    'rejected',      -- 거절됨
    'no_response'    -- 무응답
  )),
  
  -- 연락 정보
  contact_method TEXT CHECK (contact_method IN ('dm', 'email', 'comment')),
  contacted_at TIMESTAMPTZ,
  script_used TEXT,
  
  -- 응답 정보
  response_received_at TIMESTAMPTZ,
  response_content TEXT,
  
  -- 승인/거절 정보
  reviewed_at TIMESTAMPTZ,
  reviewed_by UUID, -- 관리자 ID
  rejection_reason TEXT,
  
  -- 정산 관련
  is_settled BOOLEAN DEFAULT false, -- 정산 완료 여부
  settled_at TIMESTAMPTZ,
  settlement_batch_id UUID, -- 어떤 정산 배치에 포함되었는지
  
  -- 메모
  notes TEXT,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- 한 작업자가 같은 인플루언서에게 중복 연락 방지
  UNIQUE(worker_id, influencer_id, campaign_id)
);

-- ============================================
-- 6. SETTLEMENT_BATCHES (정산 배치) 테이블
-- 승인 10개 = $10 계산 로직을 위한 테이블
-- ============================================
CREATE TABLE settlement_batches (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  worker_id UUID NOT NULL REFERENCES workers(id) ON DELETE CASCADE,
  
  -- 정산 정보
  approved_count INTEGER NOT NULL, -- 이 배치에 포함된 승인 건수
  amount DECIMAL(10, 2) NOT NULL,  -- 정산 금액 (approved_count / 10 * 10)
  
  -- 상태
  status TEXT DEFAULT 'pending' CHECK (status IN (
    'pending',    -- 정산 대기
    'available',  -- 출금 가능
    'withdrawn',  -- 출금 완료
    'cancelled'   -- 취소됨
  )),
  
  -- 출금 정보
  withdrawal_id UUID,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 7. WITHDRAWALS (출금 요청) 테이블
-- ============================================
CREATE TABLE withdrawals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  worker_id UUID NOT NULL REFERENCES workers(id) ON DELETE CASCADE,
  
  -- 출금 정보
  amount DECIMAL(10, 2) NOT NULL,
  
  -- 은행 정보 (요청 시점 스냅샷)
  bank_name TEXT NOT NULL,
  bank_account_number TEXT NOT NULL,
  bank_account_holder TEXT NOT NULL,
  
  -- 상태
  status TEXT DEFAULT 'pending' CHECK (status IN (
    'pending',     -- 요청됨
    'processing',  -- 처리중
    'completed',   -- 완료
    'rejected',    -- 거절
    'cancelled'    -- 취소
  )),
  
  -- 처리 정보
  processed_at TIMESTAMPTZ,
  processed_by UUID,
  rejection_reason TEXT,
  transaction_id TEXT, -- 은행 거래 ID
  
  -- 메모
  notes TEXT,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 8. DAILY_BATCHES (일일 배치) 테이블
-- 매일 300건 배치 관리
-- ============================================
CREATE TABLE daily_batches (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  worker_id UUID NOT NULL REFERENCES workers(id) ON DELETE CASCADE,
  
  batch_date DATE NOT NULL DEFAULT CURRENT_DATE,
  total_assigned INTEGER DEFAULT 300,
  total_contacted INTEGER DEFAULT 0,
  
  -- 진행률
  progress_percentage DECIMAL(5, 2) GENERATED ALWAYS AS (
    CASE WHEN total_assigned > 0 
    THEN (total_contacted::DECIMAL / total_assigned * 100)
    ELSE 0 END
  ) STORED,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  UNIQUE(worker_id, batch_date)
);

-- ============================================
-- 9. LEADERBOARD_SNAPSHOTS (랭킹 스냅샷) 테이블
-- ============================================
CREATE TABLE leaderboard_snapshots (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  worker_id UUID NOT NULL REFERENCES workers(id) ON DELETE CASCADE,
  
  snapshot_type TEXT NOT NULL CHECK (snapshot_type IN ('daily', 'weekly', 'monthly')),
  snapshot_date DATE NOT NULL,
  
  rank_position INTEGER NOT NULL,
  approved_count INTEGER NOT NULL,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  
  UNIQUE(worker_id, snapshot_type, snapshot_date)
);

-- ============================================
-- 10. FAQ 테이블
-- ============================================
CREATE TABLE faqs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  category TEXT NOT NULL, -- general, settlement, work, technical
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- INDEXES
-- ============================================

-- Workers
CREATE INDEX idx_workers_email ON workers(email);
CREATE INDEX idx_workers_status ON workers(status);
CREATE INDEX idx_workers_rank ON workers(current_rank);

-- Influencers
CREATE INDEX idx_influencers_platform ON influencers(platform);
CREATE INDEX idx_influencers_username ON influencers(username);
CREATE INDEX idx_influencers_country ON influencers(country);
CREATE INDEX idx_influencers_followers ON influencers(followers_count);

-- Outreach Tasks
CREATE INDEX idx_outreach_worker ON outreach_tasks(worker_id);
CREATE INDEX idx_outreach_influencer ON outreach_tasks(influencer_id);
CREATE INDEX idx_outreach_campaign ON outreach_tasks(campaign_id);
CREATE INDEX idx_outreach_status ON outreach_tasks(status);
CREATE INDEX idx_outreach_created ON outreach_tasks(created_at);
CREATE INDEX idx_outreach_settled ON outreach_tasks(is_settled);

-- Settlement Batches
CREATE INDEX idx_settlement_worker ON settlement_batches(worker_id);
CREATE INDEX idx_settlement_status ON settlement_batches(status);

-- Withdrawals
CREATE INDEX idx_withdrawals_worker ON withdrawals(worker_id);
CREATE INDEX idx_withdrawals_status ON withdrawals(status);

-- Daily Batches
CREATE INDEX idx_daily_batch_worker_date ON daily_batches(worker_id, batch_date);

-- Leaderboard
CREATE INDEX idx_leaderboard_type_date ON leaderboard_snapshots(snapshot_type, snapshot_date);

-- ============================================
-- UPDATED_AT TRIGGER
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply trigger to all tables with updated_at
CREATE TRIGGER update_workers_updated_at BEFORE UPDATE ON workers
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_brands_updated_at BEFORE UPDATE ON brands
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_campaigns_updated_at BEFORE UPDATE ON campaigns
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_influencers_updated_at BEFORE UPDATE ON influencers
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_outreach_updated_at BEFORE UPDATE ON outreach_tasks
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_settlement_updated_at BEFORE UPDATE ON settlement_batches
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_withdrawals_updated_at BEFORE UPDATE ON withdrawals
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_daily_batches_updated_at BEFORE UPDATE ON daily_batches
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_faqs_updated_at BEFORE UPDATE ON faqs
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
