'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Trophy, Medal, Award } from 'lucide-react'
import { cn } from '@/lib/utils'

interface LeaderboardEntry {
  rank: number
  name: string
  country: string
  approvalRate: number
  totalApproved: number
  isCurrentUser?: boolean
}

interface RankingLeaderboardProps {
  leaderboard: LeaderboardEntry[]
}

function getRankIcon(rank: number) {
  switch (rank) {
    case 1:
      return <Trophy className="h-6 w-6 text-amber-500" />
    case 2:
      return <Medal className="h-6 w-6 text-gray-400" />
    case 3:
      return <Award className="h-6 w-6 text-amber-700" />
    default:
      return null
  }
}

function getRankBadgeColor(rank: number) {
  switch (rank) {
    case 1:
      return 'bg-amber-500 text-white'
    case 2:
      return 'bg-gray-400 text-white'
    case 3:
      return 'bg-amber-700 text-white'
    default:
      return 'bg-muted text-muted-foreground'
  }
}

export function RankingLeaderboard({ leaderboard }: RankingLeaderboardProps) {
  return (
    <Card className="border-none shadow-sm">
      <CardHeader className="flex flex-row items-center gap-2">
        <Trophy className="h-5 w-5 text-amber-500" />
        <CardTitle className="text-base font-medium">이번 달 리더보드</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {leaderboard.map((entry) => (
            <div
              key={entry.rank}
              className={cn(
                'flex items-center justify-between rounded-xl border p-4 transition-all',
                entry.isCurrentUser
                  ? 'border-accent bg-accent/5 ring-1 ring-accent'
                  : 'border-border hover:bg-muted/50'
              )}
            >
              <div className="flex items-center gap-4">
                {/* Rank */}
                <div className="flex w-12 items-center justify-center">
                  {getRankIcon(entry.rank) || (
                    <Badge className={cn('h-8 w-8 justify-center rounded-full p-0 text-sm', getRankBadgeColor(entry.rank))}>
                      {entry.rank}
                    </Badge>
                  )}
                </div>

                {/* User Info */}
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-sm font-medium text-secondary-foreground">
                  {entry.name.charAt(0)}
                </div>
                <div>
                  <p className={cn('font-medium', entry.isCurrentUser && 'text-accent')}>
                    {entry.name}
                    {entry.isCurrentUser && (
                      <Badge variant="secondary" className="ml-2 bg-accent/10 text-accent">
                        나
                      </Badge>
                    )}
                  </p>
                  <p className="text-sm text-muted-foreground">{entry.country}</p>
                </div>
              </div>

              {/* Stats */}
              <div className="flex items-center gap-8">
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">승인율</p>
                  <p className={cn('text-lg font-semibold', entry.rank <= 3 && 'text-primary')}>
                    {entry.approvalRate}%
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">총 승인</p>
                  <p className="text-lg font-semibold">{entry.totalApproved}건</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Note */}
        <div className="mt-6 rounded-lg bg-muted/50 p-4 text-center">
          <p className="text-sm text-muted-foreground">
            순위는 승인율을 기준으로 매일 자정에 업데이트됩니다.
            <br />
            상위 3명에게는 월말 보너스가 지급됩니다!
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
