-- ============================================
-- SLAM GLOBAL - Seed Data for Testing
-- ============================================

-- ============================================
-- 1. 브랜드 데이터
-- ============================================
INSERT INTO brands (id, name, logo_url, category, country, description) VALUES
  ('b1000000-0000-0000-0000-000000000001', 'Pyunkang Yul', NULL, 'skincare', 'KR', '한방 성분 기반 스킨케어 브랜드'),
  ('b1000000-0000-0000-0000-000000000002', 'SKIN&LAB', NULL, 'skincare', 'KR', '비타민 스킨케어 전문 브랜드'),
  ('b1000000-0000-0000-0000-000000000003', 'Isntree', NULL, 'skincare', 'KR', '자연 유래 성분 스킨케어'),
  ('b1000000-0000-0000-0000-000000000004', 'COSRX', NULL, 'skincare', 'KR', '트러블 케어 전문 브랜드'),
  ('b1000000-0000-0000-0000-000000000005', 'Anua', NULL, 'skincare', 'KR', '어성초 성분 전문 브랜드');

-- ============================================
-- 2. 캠페인 데이터
-- ============================================
INSERT INTO campaigns (id, brand_id, name, description, target_platform, target_countries, min_followers, status, script_template) VALUES
  (
    'c1000000-0000-0000-0000-000000000001',
    'b1000000-0000-0000-0000-000000000001',
    'Pyunkang Yul US Launch 2024',
    '미국 시장 진출을 위한 인플루언서 시딩 캠페인',
    ARRAY['instagram', 'tiktok'],
    ARRAY['US'],
    5000,
    'active',
    'Hi {name}! 👋 I''m reaching out from Pyunkang Yul, a Korean skincare brand known for our gentle, herb-based formulas. We''d love to send you some products to try! Would you be interested in a collaboration? 💕'
  ),
  (
    'c1000000-0000-0000-0000-000000000002',
    'b1000000-0000-0000-0000-000000000002',
    'SKIN&LAB Vitamin Campaign',
    '비타민 라인 미국 마케팅',
    ARRAY['tiktok'],
    ARRAY['US'],
    10000,
    'active',
    'Hey {name}! ✨ SKIN&LAB here - we make vitamin-powered skincare that''s been trending in Korea. Your content is amazing and we think you''d love our products! Interested in trying them out? 🧴'
  ),
  (
    'c1000000-0000-0000-0000-000000000003',
    'b1000000-0000-0000-0000-000000000003',
    'Isntree Global Expansion',
    '글로벌 시장 확장 캠페인',
    ARRAY['instagram', 'youtube'],
    ARRAY['US', 'UK', 'CA'],
    3000,
    'active',
    'Hello {name}! 🌿 I''m from Isntree, a clean beauty brand from Korea. We love your aesthetic and would be honored to send you our bestselling products. Let us know if you''re interested! 💚'
  );

-- ============================================
-- 3. 테스트 작업자 데이터
-- ============================================
INSERT INTO workers (id, email, name, nickname, phone, bank_name, bank_account_number, bank_account_holder, total_contacted, total_approved, total_pending, available_balance, current_rank, weekly_approved, status) VALUES
  ('w1000000-0000-0000-0000-000000000001', 'worker1@example.com', '김민수', 'MinsuK', '010-1234-5678', '신한은행', '110-123-456789', '김민수', 156, 89, 12, 80.00, 1, 45, 'active'),
  ('w1000000-0000-0000-0000-000000000002', 'worker2@example.com', '이지은', 'JieunL', '010-2345-6789', '국민은행', '123-456-789012', '이지은', 134, 72, 8, 70.00, 2, 38, 'active'),
  ('w1000000-0000-0000-0000-000000000003', 'worker3@example.com', '박서준', 'SeojunP', '010-3456-7890', '우리은행', '1002-345-678901', '박서준', 98, 54, 15, 50.00, 3, 28, 'active'),
  ('w1000000-0000-0000-0000-000000000004', 'worker4@example.com', '최유나', 'YunaC', '010-4567-8901', '하나은행', '123-45-67890', '최유나', 87, 45, 6, 40.00, 4, 22, 'active'),
  ('w1000000-0000-0000-0000-000000000005', 'worker5@example.com', '정현우', 'HyunwooJ', '010-5678-9012', '카카오뱅크', '3333-12-3456789', '정현우', 76, 38, 9, 30.00, 5, 18, 'active');

-- ============================================
-- 4. 인플루언서 데이터
-- ============================================
INSERT INTO influencers (id, username, full_name, platform, profile_url, followers_count, country, category, engagement_rate, contact_dm) VALUES
  ('i1000000-0000-0000-0000-000000000001', 'skincare_sarah', 'Sarah Johnson', 'instagram', 'https://instagram.com/skincare_sarah', 45200, 'US', ARRAY['skincare', 'beauty'], 4.2, true),
  ('i1000000-0000-0000-0000-000000000002', 'glowwithme_', 'Emily Chen', 'tiktok', 'https://tiktok.com/@glowwithme_', 128000, 'US', ARRAY['skincare', 'lifestyle'], 6.8, true),
  ('i1000000-0000-0000-0000-000000000003', 'beautybyjess', 'Jessica Williams', 'instagram', 'https://instagram.com/beautybyjess', 67800, 'US', ARRAY['makeup', 'skincare'], 3.9, true),
  ('i1000000-0000-0000-0000-000000000004', 'kbeauty.lover', 'Amanda Lee', 'tiktok', 'https://tiktok.com/@kbeauty.lover', 89500, 'US', ARRAY['kbeauty', 'skincare'], 5.5, true),
  ('i1000000-0000-0000-0000-000000000005', 'naturalbeauty.co', 'Olivia Brown', 'instagram', 'https://instagram.com/naturalbeauty.co', 34100, 'US', ARRAY['clean beauty', 'skincare'], 4.8, true),
  ('i1000000-0000-0000-0000-000000000006', 'skinfluencer_mike', 'Mike Taylor', 'tiktok', 'https://tiktok.com/@skinfluencer_mike', 156000, 'US', ARRAY['skincare', 'men grooming'], 7.2, true),
  ('i1000000-0000-0000-0000-000000000007', 'dewyskin_daily', 'Rachel Kim', 'instagram', 'https://instagram.com/dewyskin_daily', 78300, 'US', ARRAY['skincare', 'wellness'], 5.1, true),
  ('i1000000-0000-0000-0000-000000000008', 'acne.journey', 'Taylor Smith', 'tiktok', 'https://tiktok.com/@acne.journey', 234000, 'US', ARRAY['acne', 'skincare'], 8.3, true),
  ('i1000000-0000-0000-0000-000000000009', 'glassskin_goals', 'Jennifer Park', 'instagram', 'https://instagram.com/glassskin_goals', 91200, 'US', ARRAY['kbeauty', 'glass skin'], 4.6, true),
  ('i1000000-0000-0000-0000-000000000010', 'skincare.science', 'Dr. Lisa Wang', 'tiktok', 'https://tiktok.com/@skincare.science', 567000, 'US', ARRAY['dermatology', 'skincare'], 9.1, true);

-- ============================================
-- 5. 작업 기록 데이터 (outreach_tasks)
-- ============================================
INSERT INTO outreach_tasks (worker_id, influencer_id, campaign_id, status, contact_method, contacted_at, is_settled) VALUES
  -- Worker 1의 작업들
  ('w1000000-0000-0000-0000-000000000001', 'i1000000-0000-0000-0000-000000000001', 'c1000000-0000-0000-0000-000000000001', 'approved', 'dm', NOW() - INTERVAL '5 days', true),
  ('w1000000-0000-0000-0000-000000000001', 'i1000000-0000-0000-0000-000000000002', 'c1000000-0000-0000-0000-000000000001', 'approved', 'dm', NOW() - INTERVAL '4 days', true),
  ('w1000000-0000-0000-0000-000000000001', 'i1000000-0000-0000-0000-000000000003', 'c1000000-0000-0000-0000-000000000002', 'pending', 'dm', NOW() - INTERVAL '2 days', false),
  ('w1000000-0000-0000-0000-000000000001', 'i1000000-0000-0000-0000-000000000004', 'c1000000-0000-0000-0000-000000000002', 'contacted', 'dm', NOW() - INTERVAL '1 day', false),
  
  -- Worker 2의 작업들
  ('w1000000-0000-0000-0000-000000000002', 'i1000000-0000-0000-0000-000000000005', 'c1000000-0000-0000-0000-000000000001', 'approved', 'email', NOW() - INTERVAL '6 days', true),
  ('w1000000-0000-0000-0000-000000000002', 'i1000000-0000-0000-0000-000000000006', 'c1000000-0000-0000-0000-000000000003', 'rejected', 'dm', NOW() - INTERVAL '3 days', false),
  ('w1000000-0000-0000-0000-000000000002', 'i1000000-0000-0000-0000-000000000007', 'c1000000-0000-0000-0000-000000000003', 'pending', 'dm', NOW() - INTERVAL '1 day', false),
  
  -- Worker 3의 작업들
  ('w1000000-0000-0000-0000-000000000003', 'i1000000-0000-0000-0000-000000000008', 'c1000000-0000-0000-0000-000000000001', 'approved', 'dm', NOW() - INTERVAL '4 days', true),
  ('w1000000-0000-0000-0000-000000000003', 'i1000000-0000-0000-0000-000000000009', 'c1000000-0000-0000-0000-000000000002', 'no_response', 'dm', NOW() - INTERVAL '7 days', false),
  ('w1000000-0000-0000-0000-000000000003', 'i1000000-0000-0000-0000-000000000010', 'c1000000-0000-0000-0000-000000000003', 'contacted', 'email', NOW() - INTERVAL '1 day', false);

-- ============================================
-- 6. 일일 배치 데이터
-- ============================================
INSERT INTO daily_batches (worker_id, batch_date, total_assigned, total_contacted) VALUES
  ('w1000000-0000-0000-0000-000000000001', CURRENT_DATE, 300, 187),
  ('w1000000-0000-0000-0000-000000000002', CURRENT_DATE, 300, 145),
  ('w1000000-0000-0000-0000-000000000003', CURRENT_DATE, 300, 98),
  ('w1000000-0000-0000-0000-000000000004', CURRENT_DATE, 300, 76),
  ('w1000000-0000-0000-0000-000000000005', CURRENT_DATE, 300, 54);

-- ============================================
-- 7. 정산 배치 데이터
-- ============================================
INSERT INTO settlement_batches (worker_id, approved_count, amount, status) VALUES
  ('w1000000-0000-0000-0000-000000000001', 80, 80.00, 'available'),
  ('w1000000-0000-0000-0000-000000000002', 70, 70.00, 'available'),
  ('w1000000-0000-0000-0000-000000000003', 50, 50.00, 'available'),
  ('w1000000-0000-0000-0000-000000000001', 30, 30.00, 'withdrawn'),
  ('w1000000-0000-0000-0000-000000000002', 20, 20.00, 'withdrawn');

-- ============================================
-- 8. 출금 내역 데이터
-- ============================================
INSERT INTO withdrawals (worker_id, amount, bank_name, bank_account_number, bank_account_holder, status, processed_at) VALUES
  ('w1000000-0000-0000-0000-000000000001', 30.00, '신한은행', '110-123-456789', '김민수', 'completed', NOW() - INTERVAL '10 days'),
  ('w1000000-0000-0000-0000-000000000002', 20.00, '국민은행', '123-456-789012', '이지은', 'completed', NOW() - INTERVAL '7 days'),
  ('w1000000-0000-0000-0000-000000000001', 50.00, '신한은행', '110-123-456789', '김민수', 'pending', NULL);

-- ============================================
-- 9. FAQ 데이터
-- ============================================
INSERT INTO faqs (category, question, answer, sort_order) VALUES
  ('general', '브랜드슬램은 어떤 회사인가요?', '브랜드슬램(Slam Global)은 K-Beauty 브랜드의 글로벌 마케팅을 전문으로 하는 에이전시입니다. 미국 시장에서 누적 5억뷰 이상의 바이럴 성과를 달성했으며, 인플루언서 시딩을 통해 브랜드의 해외 진출을 돕고 있습니다.', 1),
  ('general', '작업자는 어떤 일을 하나요?', '작업자는 브랜드슬램이 제공하는 인플루언서 리스트를 바탕으로 DM이나 이메일을 통해 협업을 제안합니다. 인플루언서가 긍정적으로 응답하면 승인 처리되고, 정산이 진행됩니다.', 2),
  ('work', '하루에 몇 명에게 연락해야 하나요?', '기본적으로 하루 300명의 인플루언서에게 연락하는 것을 목표로 합니다. 효율적인 템플릿과 도구를 제공하여 빠르게 작업할 수 있도록 지원합니다.', 1),
  ('work', '연락은 어떤 방식으로 하나요?', 'Instagram DM, TikTok DM, 또는 이메일을 통해 연락합니다. 플랫폼에 따라 적절한 스크립트가 제공되며, 필요시 커스터마이징도 가능합니다.', 2),
  ('settlement', '정산은 어떻게 이루어지나요?', '승인된 인플루언서 10명당 $10가 정산됩니다. 예를 들어, 45명이 승인되면 $40가 정산 가능하고, 나머지 5명은 다음 정산을 위해 누적됩니다.', 1),
  ('settlement', '출금은 언제 가능한가요?', '정산 가능 금액이 $10 이상이면 언제든 출금 신청이 가능합니다. 출금 요청 후 영업일 기준 3-5일 내에 등록된 계좌로 입금됩니다.', 2),
  ('settlement', '수수료가 있나요?', '출금 수수료는 없습니다. 정산된 금액 전액이 등록된 계좌로 입금됩니다. 단, 해외 송금의 경우 수취 은행에서 수수료가 발생할 수 있습니다.', 3),
  ('technical', '인플루언서가 응답하지 않으면 어떻게 되나요?', '7일 이상 응답이 없는 경우 "무응답" 처리되며, 정산 대상에서 제외됩니다. 새로운 인플루언서 리스트가 배정됩니다.', 1),
  ('technical', '거절된 경우에도 정산이 되나요?', '거절된 경우는 정산 대상이 아닙니다. 오직 인플루언서가 협업에 동의하여 "승인" 처리된 경우에만 정산됩니다.', 2);

-- ============================================
-- 10. 랭킹 스냅샷 데이터
-- ============================================
INSERT INTO leaderboard_snapshots (worker_id, snapshot_type, snapshot_date, rank_position, approved_count) VALUES
  ('w1000000-0000-0000-0000-000000000001', 'weekly', CURRENT_DATE, 1, 45),
  ('w1000000-0000-0000-0000-000000000002', 'weekly', CURRENT_DATE, 2, 38),
  ('w1000000-0000-0000-0000-000000000003', 'weekly', CURRENT_DATE, 3, 28),
  ('w1000000-0000-0000-0000-000000000004', 'weekly', CURRENT_DATE, 4, 22),
  ('w1000000-0000-0000-0000-000000000005', 'weekly', CURRENT_DATE, 5, 18);
