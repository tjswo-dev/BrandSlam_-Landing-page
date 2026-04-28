'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Target, TrendingUp } from 'lucide-react'

interface MilestoneProgressProps {
  currentApproved: number
  targetApproved: number
  nextReward: number
}

export function MilestoneProgress({ currentApproved, targetApproved, nextReward }: MilestoneProgressProps) {
  const percentage = Math.round((currentApproved / targetApproved) * 100)
  const remaining = targetApproved - currentApproved

  return (
    <Card className="border-none shadow-sm">
      <CardHeader className="flex flex-row items-center gap-2 pb-2">
        <Target className="h-5 w-5 text-accent" />
        <CardTitle className="text-base font-medium">다음 마일스톤</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Progress Ring Visualization */}
        <div className="flex items-center gap-6">
          <div className="relative flex h-28 w-28 items-center justify-center">
            <svg className="h-28 w-28 -rotate-90 transform">
              <circle
                cx="56"
                cy="56"
                r="48"
                stroke="currentColor"
                strokeWidth="8"
                fill="transparent"
                className="text-muted"
              />
              <circle
                cx="56"
                cy="56"
                r="48"
                stroke="currentColor"
                strokeWidth="8"
                fill="transparent"
                strokeDasharray={`${percentage * 3.02} 302`}
                className="text-accent transition-all duration-500"
              />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="text-2xl font-bold">{currentApproved}</span>
              <span className="text-xs text-muted-foreground">/ {targetApproved}</span>
            </div>
          </div>
          <div className="flex-1 space-y-3">
            <div>
              <p className="text-sm text-muted-foreground">다음 정산까지</p>
              <p className="text-xl font-semibold">
                <span className="text-accent">{remaining}건</span> 남음
              </p>
            </div>
            <div className="flex items-center gap-2 rounded-lg bg-accent/10 px-3 py-2">
              <TrendingUp className="h-4 w-4 text-accent" />
              <span className="text-sm font-medium">
                달성 시 <span className="text-accent">${nextReward}</span> 정산
              </span>
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="rounded-lg bg-muted/50 p-4">
          <h4 className="mb-2 font-medium">10-Unit Logic</h4>
          <p className="text-sm text-muted-foreground">
            승인 완료 상태의 데이터가 10개 쌓일 때마다 $10의 정산 가능 금액이 생성됩니다.
            현재까지 총 <span className="font-medium text-foreground">12회</span> 달성했습니다.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
