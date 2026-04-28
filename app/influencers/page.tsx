import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { InfluencerFullList } from '@/components/influencers/influencer-full-list'
import { mockInfluencers } from '@/lib/mock-data'

export default function InfluencersPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">오늘의 인플루언서 리스트</h1>
          <p className="text-muted-foreground">배정된 인플루언서에게 DM을 발송하고 컨택 완료를 기록하세요.</p>
        </div>
        <InfluencerFullList influencers={mockInfluencers} />
      </div>
    </DashboardLayout>
  )
}
