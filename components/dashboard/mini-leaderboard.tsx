'use client'

import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Trophy, Crown, Medal, Award, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface LeaderboardEntry {
  rank: number
  name: string
  country: string
  approvalRate: number
  totalApproved: number
  isCurrentUser?: boolean
}

interface MiniLeaderboardProps {
  leaderboard: LeaderboardEntry[]
}

function getRankIcon(rank: number) {
  switch (rank) {
    case 1:
      return <Crown className="h-4 w-4 text-amber-400" />
    case 2:
      return <Medal className="h-4 w-4 text-gray-300" />
    case 3:
      return <Award className="h-4 w-4 text-amber-600" />
    default:
      return null
  }
}

function getRankStyle(rank: number) {
  switch (rank) {
    case 1:
      return 'bg-gradient-to-r from-amber-500 to-yellow-500 text-white shadow-lg shadow-amber-500/30'
    case 2:
      return 'bg-gradient-to-r from-gray-400 to-gray-500 text-white'
    case 3:
      return 'bg-gradient-to-r from-amber-700 to-amber-800 text-white'
    default:
      return 'bg-muted text-muted-foreground'
  }
}

export function MiniLeaderboard({ leaderboard }: MiniLeaderboardProps) {
  return (
    <Card className="border-none shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between border-b border-border/50 pb-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 to-yellow-500">
            <Trophy className="h-5 w-5 text-white" />
          </div>
          <div>
            <CardTitle className="text-lg font-semibold">이번 달 랭킹</CardTitle>
            <p className="text-sm text-muted-foreground">Top 5 작업자</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="space-y-2">
          {leaderboard.slice(0, 5).map((entry) => (
            <div
              key={entry.rank}
              className={cn(
                'group flex items-center justify-between rounded-xl px-4 py-3 transition-all',
                entry.isCurrentUser
                  ? 'bg-gradient-to-r from-pink-500/10 to-purple-600/10 ring-1 ring-pink-500/30'
                  : 'hover:bg-muted/50'
              )}
            >
              <div className="flex items-center gap-3">
                <div className={cn(
                  'flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold',
                  getRankStyle(entry.rank)
                )}>
                  {getRankIcon(entry.rank) || entry.rank}
                </div>
                <div>
                  <p className={cn(
                    'font-medium',
                    entry.isCurrentUser && 'text-pink-500'
                  )}>
                    {entry.name}
                    {entry.isCurrentUser && (
                      <Badge className="ml-2 bg-gradient-to-r from-pink-500 to-purple-600 text-xs text-white">
                        나
                      </Badge>
                    )}
                  </p>
                  <p className="text-xs text-muted-foreground">{entry.country}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold">{entry.approvalRate}%</p>
                <p className="text-xs text-muted-foreground">{entry.totalApproved}건 승인</p>
              </div>
            </div>
          ))}
        </div>
        <Link href="/ranking" className="mt-4 block">
          <Button variant="outline" className="w-full gap-2 border-border/50">
            전체 랭킹 보기
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  )
}
