'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Target, Zap, RefreshCw, Sparkles } from 'lucide-react'
import type { WorkerStats } from '@/lib/types'

interface DailyProgressProps {
  stats: WorkerStats
}

export function DailyProgress({ stats }: DailyProgressProps) {
  const completed = stats.dailyAssigned - stats.dailyRemaining
  const percentage = Math.round((completed / stats.dailyAssigned) * 100)

  return (
    <Card className="relative overflow-hidden border-none bg-gradient-to-br from-slate-900 to-slate-800 shadow-lg">
      <div className="absolute right-0 top-0 h-32 w-32 translate-x-8 -translate-y-8 rounded-full bg-gradient-to-br from-pink-500/20 to-purple-600/20 blur-2xl" />
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-pink-500 to-purple-600">
            <Target className="h-4 w-4 text-white" />
          </div>
          <CardTitle className="text-base font-medium text-white">오늘의 컨택 현황</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-end justify-between">
          <div>
            <span className="text-4xl font-bold text-white">{completed}</span>
            <span className="text-xl text-gray-400"> / {stats.dailyAssigned}</span>
          </div>
          <div className="flex items-center gap-1 rounded-full bg-gradient-to-r from-pink-500/20 to-purple-600/20 px-3 py-1">
            <Zap className="h-4 w-4 text-pink-400" />
            <span className="text-sm font-semibold text-pink-400">{percentage}%</span>
          </div>
        </div>

        <div className="relative">
          <div className="h-3 overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-gradient-to-r from-pink-500 to-purple-600 transition-all duration-500"
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>

        {/* 이월 + 신규 breakdown */}
        <div className="grid grid-cols-3 gap-2 rounded-xl bg-white/5 p-3">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-amber-400">
              <RefreshCw className="h-3 w-3" />
              <span className="text-xs font-medium">이월</span>
            </div>
            <p className="mt-0.5 text-lg font-bold text-white">{stats.carryoverCount}명</p>
            <p className="text-xs text-gray-500">전날 미완료</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-blue-400">
              <Sparkles className="h-3 w-3" />
              <span className="text-xs font-medium">신규</span>
            </div>
            <p className="mt-0.5 text-lg font-bold text-white">{stats.newCount}명</p>
            <p className="text-xs text-gray-500">오늘 추가</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-gray-400">
              <Target className="h-3 w-3" />
              <span className="text-xs font-medium">남은</span>
            </div>
            <p className="mt-0.5 text-lg font-bold text-white">{stats.dailyRemaining}명</p>
            <p className="text-xs text-gray-500">미컨택</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
