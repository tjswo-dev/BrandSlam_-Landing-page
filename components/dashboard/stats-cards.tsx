'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Send, CheckCircle, Clock, DollarSign, TrendingUp } from 'lucide-react'
import type { WorkerStats } from '@/lib/types'

interface StatsCardsProps {
  stats: WorkerStats
}

export function StatsCards({ stats }: StatsCardsProps) {
  const cards = [
    {
      label: '오늘 연락한 수',
      value: stats.todayContacted,
      icon: Send,
      trend: '+12%',
      trendUp: true,
      gradient: 'from-blue-500 to-indigo-600',
    },
    {
      label: '현재 승인된 수',
      value: stats.totalApproved,
      icon: CheckCircle,
      trend: '+8%',
      trendUp: true,
      gradient: 'from-emerald-500 to-teal-600',
    },
    {
      label: '승인 대기중',
      value: stats.pendingApproval,
      icon: Clock,
      trend: '-3%',
      trendUp: false,
      gradient: 'from-amber-500 to-orange-600',
    },
    {
      label: '정산 가능 금액',
      value: `$${stats.availableAmount.toLocaleString()}`,
      icon: DollarSign,
      trend: '+24%',
      trendUp: true,
      gradient: 'from-pink-500 to-purple-600',
    },
  ]

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => (
        <Card key={card.label} className="group relative overflow-hidden border-none bg-card shadow-lg transition-all hover:shadow-xl">
          <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-0 transition-opacity group-hover:opacity-5`} />
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${card.gradient}`}>
                <card.icon className="h-6 w-6 text-white" />
              </div>
              <div className={`flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${card.trendUp ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                <TrendingUp className={`h-3 w-3 ${!card.trendUp && 'rotate-180'}`} />
                {card.trend}
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm font-medium text-muted-foreground">{card.label}</p>
              <p className="mt-1 text-3xl font-bold tracking-tight">{card.value}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
