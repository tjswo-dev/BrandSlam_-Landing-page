'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Trophy, TrendingUp, Target } from 'lucide-react'

interface MyRankCardProps {
  rank: {
    rank: number
    name: string
    country: string
    approvalRate: number
    totalApproved: number
  }
}

export function MyRankCard({ rank }: MyRankCardProps) {
  const nextRank = rank.rank > 1 ? rank.rank - 1 : null

  return (
    <Card className="border-none bg-gradient-to-r from-accent to-accent/80 shadow-sm">
      <CardContent className="p-6">
        <div className="flex flex-wrap items-center justify-between gap-6">
          {/* Rank Display */}
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20">
              <Trophy className="h-8 w-8 text-white" />
            </div>
            <div className="text-white">
              <p className="text-sm opacity-80">현재 순위</p>
              <p className="text-4xl font-bold">{rank.rank}위</p>
            </div>
          </div>

          {/* Stats */}
          <div className="flex gap-8">
            <div className="text-center text-white">
              <p className="text-sm opacity-80">승인율</p>
              <p className="text-2xl font-bold">{rank.approvalRate}%</p>
            </div>
            <div className="text-center text-white">
              <p className="text-sm opacity-80">총 승인</p>
              <p className="text-2xl font-bold">{rank.totalApproved}건</p>
            </div>
          </div>

          {/* Next Rank Goal */}
          {nextRank && (
            <div className="flex items-center gap-3 rounded-lg bg-white/10 px-4 py-3">
              <Target className="h-5 w-5 text-white" />
              <div className="text-white">
                <p className="text-sm opacity-80">{nextRank}위까지</p>
                <p className="font-semibold">승인율 2% 더 필요</p>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
