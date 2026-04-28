// Worker types
export interface Worker {
  id: string
  email: string
  country: string
  snsInfo: {
    platform: string
    username: string
  }
  paymentMethod: 'paypal' | 'bank'
  paymentDetails: string
  grade: 'normal' | 'excellent'
  createdAt: Date
}

// Influencer types
export interface Influencer {
  id: string
  name: string
  snsLink: string
  platform: 'instagram' | 'youtube' | 'tiktok'
  followers: number
  country: string
  brand: string
  isNew?: boolean       // true = 오늘 신규 추가, false = 전날 이월
  assignedTo?: string
  assignedDate?: Date
}

// Task Log types
export type TaskStatus = 'pending' | 'submitted' | 'approved' | 'rejected'

export interface TaskLog {
  id: string
  workerId: string
  influencerId: string
  influencer?: Influencer
  submittedAt: Date
  screenshotUrl?: string
  status: TaskStatus
  approvedAt?: Date
  rejectedReason?: string
}

// Settlement types
export interface Settlement {
  id: string
  workerId: string
  totalApproved: number
  availableAmount: number
  withdrawnAmount: number
  lastWithdrawalAt?: Date
}

export interface WithdrawalHistory {
  id: string
  workerId: string
  amount: number
  requestedAt: Date
  processedAt?: Date
  status: 'pending' | 'completed' | 'failed'
}

// Campaign Guide types
export interface CampaignGuide {
  id: string
  brand: string
  title: string
  description: string
  imageUrls: string[]
  hashtags: string[]
  createdAt: Date
}

// Script templates
export interface ScriptTemplate {
  id: string
  brand: string
  country: string
  language: string
  content: string
}

// Worker stats for dashboard
export interface WorkerStats {
  todayContacted: number
  totalApproved: number
  pendingApproval: number
  availableAmount: number
  dailyAssigned: number
  dailyRemaining: number
  carryoverCount: number   // 전날 미완료 → 오늘 이월된 수
  newCount: number         // 전날 컨택완료 수만큼 오늘 신규 추가된 수
}
