import type { Influencer, TaskLog, WorkerStats, ScriptTemplate, CampaignGuide, WithdrawalHistory } from './types'

// ─── Influencer Generator ────────────────────────────────────────────────────

const FIRST_NAMES = [
  'Emma', 'Sophie', 'Maria', 'Lisa', 'Anna', 'Yuki', 'Olivia', 'Chloe', 'Ava', 'Mia',
  'Sara', 'Hana', 'Priya', 'Luisa', 'Claire', 'Rachel', 'Nadia', 'Zoe', 'Mei', 'Isabelle',
  'Fatima', 'Camille', 'Ji-Yeon', 'Amara', 'Valentina', 'Elena', 'Nina', 'Grace', 'Aisha', 'Yuna',
]
const LAST_NAMES = [
  'Johnson', 'Chen', 'Garcia', 'Kim', 'Muller', 'Tanaka', 'Brown', 'Martin', 'Thompson', 'Rossi',
  'Lindqvist', 'Nakamura', 'Sharma', 'Fernandez', 'Dupont', 'Park', 'Kowalski', 'Williams', 'Lin', 'Brun',
  'Al-Rashid', 'Moreau', 'Cruz', 'Osei', 'Santos', 'Nguyen', 'Patel', 'Weber', 'Johansson', 'Lee',
]
const PLATFORMS: Influencer['platform'][] = ['instagram', 'tiktok', 'youtube']
const COUNTRIES = ['US', 'UK', 'JP', 'FR', 'DE', 'AU', 'IT', 'ES', 'KR', 'BR', 'CA', 'MX', 'SG', 'IN', 'PL', 'AE', 'GH', 'SE']
const BRANDS = ['GlowUp Cosmetics', 'K-Beauty Lab', 'Seoul Glow', 'Anua', 'Isntree']

// 전날 300명 중 250명 컨택완료 → 오늘: 이월 50명 + 신규 250명 = 300명
const CARRYOVER_COUNT = 50
const NEW_COUNT = 250
const TOTAL = CARRYOVER_COUNT + NEW_COUNT   // 300

function generateInfluencers(): Influencer[] {
  const result: Influencer[] = []
  for (let i = 0; i < TOTAL; i++) {
    const first = FIRST_NAMES[i % FIRST_NAMES.length]
    const last = LAST_NAMES[Math.floor(i / FIRST_NAMES.length) % LAST_NAMES.length]
    const platform = PLATFORMS[i % PLATFORMS.length]
    const handle = `${first.toLowerCase()}${last.toLowerCase().replace(/[^a-z]/g, '')}_${i + 1}`
    const snsBase = platform === 'instagram'
      ? `https://instagram.com/${handle}`
      : `https://${platform}.com/@${handle}`

    result.push({
      id: String(i + 1),
      name: `${first} ${last}`,
      snsLink: snsBase,
      platform,
      followers: 50000 + ((i * 7919) % 550000),
      country: COUNTRIES[i % COUNTRIES.length],
      brand: BRANDS[i % BRANDS.length],
      isNew: i >= CARRYOVER_COUNT,   // 0~49: 이월, 50~299: 신규
    })
  }
  return result
}

export const mockInfluencers: Influencer[] = generateInfluencers()

// ─── Task Logs ───────────────────────────────────────────────────────────────

export const mockTaskLogs: TaskLog[] = [
  { id: '1', workerId: 'worker-1', influencerId: '1',  submittedAt: new Date('2024-01-15'), status: 'approved',  approvedAt: new Date('2024-01-16') },
  { id: '2', workerId: 'worker-1', influencerId: '2',  submittedAt: new Date('2024-01-15'), status: 'pending' },
  { id: '3', workerId: 'worker-1', influencerId: '3',  submittedAt: new Date('2024-01-14'), status: 'approved',  approvedAt: new Date('2024-01-15') },
  { id: '4', workerId: 'worker-1', influencerId: '4',  submittedAt: new Date('2024-01-14'), status: 'rejected',  rejectedReason: 'DM not confirmed' },
  { id: '5', workerId: 'worker-1', influencerId: '5',  submittedAt: new Date('2024-01-13'), status: 'approved',  approvedAt: new Date('2024-01-14') },
  { id: '6', workerId: 'worker-1', influencerId: '6',  submittedAt: new Date('2024-01-13'), status: 'pending' },
]

// ─── Worker Stats ─────────────────────────────────────────────────────────────
// 시뮬레이션: 전날 300명 중 250명 컨택완료 → 오늘 이월 50명 + 신규 250명

export const mockWorkerStats: WorkerStats = {
  todayContacted: 45,
  totalApproved: 127,
  pendingApproval: 23,
  availableAmount: 120,
  dailyAssigned: TOTAL,          // 300
  dailyRemaining: TOTAL - 45,    // 255
  carryoverCount: CARRYOVER_COUNT, // 50
  newCount: NEW_COUNT,            // 250
}

// ─── Script Templates ────────────────────────────────────────────────────────

export const mockScriptTemplates: ScriptTemplate[] = [
  {
    id: '1',
    brand: 'GlowUp Cosmetics',
    country: 'US',
    language: 'English',
    content: `Hi [Name]! 👋

I'm reaching out from GlowUp Cosmetics, a premium K-beauty brand loved by skincare enthusiasts worldwide.

We've been following your amazing content and would love to collaborate with you! We'd like to send you our bestselling products for you to try and share with your audience.

Interested? Let me know and I'll share more details!

Best,
BrandSlam Team`,
  },
  {
    id: '2',
    brand: 'K-Beauty Lab',
    country: 'KR',
    language: 'Korean',
    content: `안녕하세요 [Name]님! 👋

K-Beauty Lab에서 연락드립니다. 저희 브랜드는 글로벌 뷰티 인플루언서들과 함께 성장하고 있습니다.

[Name]님의 콘텐츠를 정말 인상깊게 보고 있어요! 저희 베스트셀러 제품을 보내드리고 협업을 제안드리고 싶습니다.

관심 있으시면 답장 부탁드려요!

감사합니다,
BrandSlam 팀`,
  },
  {
    id: '3',
    brand: 'Seoul Glow',
    country: 'JP',
    language: 'Japanese',
    content: `こんにちは [Name]さん! 👋

Seoul Glowからご連絡させていただきます。私たちは韓国発のスキンケアブランドです。

あなたの素晴らしいコンテンツに感銘を受けました！ぜひコラボレーションのご提案をさせてください。

ご興味がございましたら、ご返信お待ちしております！

よろしくお願いいたします,
BrandSlam チーム`,
  },
  {
    id: '4',
    brand: 'Anua',
    country: 'US',
    language: 'English',
    content: `Hey [Name]! 👋

We're Anua, a K-beauty brand known for our gentle, nature-derived formulas loved across Asia and beyond.

Your content style is exactly what we look for in a collaboration partner! We'd love to send you some of our hero products — no strings attached.

Would you be open to chatting more?

Warmly,
Anua x BrandSlam`,
  },
  {
    id: '5',
    brand: 'Isntree',
    country: 'US',
    language: 'English',
    content: `Hi [Name]! 👋

I'm reaching out on behalf of Isntree — a K-beauty skincare brand focused on clean, effective formulas with minimal irritants.

We think your audience would love our products and we'd love to collaborate! We'll send you our bestselling items so you can experience them firsthand.

Let me know if you're interested!

Best,
BrandSlam Team`,
  },
]

// ─── Campaign Guides ─────────────────────────────────────────────────────────

export const mockCampaignGuides: CampaignGuide[] = [
  {
    id: '1',
    brand: 'GlowUp Cosmetics',
    title: 'Spring 2024 Campaign Guidelines',
    description: 'Focus on our new Vitamin C serum line. Emphasize natural ingredients and visible results within 2 weeks.',
    imageUrls: ['/placeholder.jpg'],
    hashtags: ['#GlowUpCosmetics', '#VitaminCGlow', '#KBeauty', '#SkincareRoutine'],
    createdAt: new Date('2024-01-01'),
  },
  {
    id: '2',
    brand: 'K-Beauty Lab',
    title: 'Hydration Heroes Campaign',
    description: 'Promote our hydrating essence and moisturizer duo. Target dry/combination skin concerns.',
    imageUrls: ['/placeholder.jpg'],
    hashtags: ['#KBeautyLab', '#HydrationHeroes', '#GlassSkin', '#KoreanSkincare'],
    createdAt: new Date('2024-01-10'),
  },
  {
    id: '3',
    brand: 'Seoul Glow',
    title: 'Clean Beauty Initiative',
    description: 'Highlight our cruelty-free and vegan formulas. Focus on sustainability and eco-friendly packaging.',
    imageUrls: ['/placeholder.jpg'],
    hashtags: ['#SeoulGlow', '#CleanBeauty', '#VeganSkincare', '#SustainableBeauty'],
    createdAt: new Date('2024-01-15'),
  },
]

// ─── Withdrawal History ───────────────────────────────────────────────────────

export const mockWithdrawalHistory: WithdrawalHistory[] = [
  { id: '1', workerId: 'worker-1', amount: 50, requestedAt: new Date('2024-01-10'), processedAt: new Date('2024-01-12'), status: 'completed' },
  { id: '2', workerId: 'worker-1', amount: 30, requestedAt: new Date('2024-01-05'), processedAt: new Date('2024-01-07'), status: 'completed' },
  { id: '3', workerId: 'worker-1', amount: 20, requestedAt: new Date('2023-12-28'), processedAt: new Date('2023-12-30'), status: 'completed' },
]

// ─── Leaderboard ──────────────────────────────────────────────────────────────

export const mockLeaderboard = [
  { rank: 1, name: 'Kim Ji-yeon',    country: 'KR', approvalRate: 94, totalApproved: 856 },
  { rank: 2, name: 'Sarah Williams', country: 'US', approvalRate: 91, totalApproved: 743 },
  { rank: 3, name: 'Tanaka Yuki',    country: 'JP', approvalRate: 89, totalApproved: 698 },
  { rank: 4, name: 'Emma Chen',      country: 'UK', approvalRate: 87, totalApproved: 612 },
  { rank: 5, name: 'You',            country: 'KR', approvalRate: 85, totalApproved: 127, isCurrentUser: true },
]
