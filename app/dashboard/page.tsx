import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { StatsCards } from '@/components/dashboard/stats-cards'
import { DailyProgress } from '@/components/dashboard/daily-progress'
import { InfluencerList } from '@/components/dashboard/influencer-list'
import { MiniLeaderboard } from '@/components/dashboard/mini-leaderboard'
import { mockWorkerStats, mockInfluencers, mockLeaderboard } from '@/lib/mock-data'

export default function HomePage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">안녕하세요, Worker님!</h1>
            <p className="text-muted-foreground">오늘도 좋은 하루 되세요. 새로운 인플루언서 리스트가 준비되었습니다.</p>
          </div>
          <div className="hidden items-center gap-2 rounded-full bg-gradient-to-r from-pink-500/10 to-purple-600/10 px-4 py-2 sm:flex">
            <div className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
            <span className="text-sm font-medium text-foreground">작업 가능</span>
          </div>
        </div>

        {/* Stats Cards */}
        <StatsCards stats={mockWorkerStats} />

        {/* Main Content Grid */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left: Progress + Influencer List */}
          <div className="space-y-6 lg:col-span-2">
            <DailyProgress stats={mockWorkerStats} />
            <InfluencerList influencers={mockInfluencers} />
          </div>

          {/* Right: Leaderboard */}
          <div>
            <MiniLeaderboard leaderboard={mockLeaderboard} />
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
