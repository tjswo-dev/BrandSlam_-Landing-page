import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { RankingLeaderboard } from '@/components/ranking/ranking-leaderboard'
import { MyRankCard } from '@/components/ranking/my-rank-card'
import { mockLeaderboard } from '@/lib/mock-data'

export default function RankingPage() {
  const myRank = mockLeaderboard.find(entry => entry.isCurrentUser)

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">랭킹</h1>
          <p className="text-muted-foreground">이번 달 우수 작업자 순위를 확인하세요.</p>
        </div>

        {/* My Rank Card */}
        {myRank && <MyRankCard rank={myRank} />}

        {/* Full Leaderboard */}
        <RankingLeaderboard leaderboard={mockLeaderboard} />
      </div>
    </DashboardLayout>
  )
}
