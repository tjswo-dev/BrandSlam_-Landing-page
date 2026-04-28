'use client'

import { Card, CardContent } from '@/components/ui/card'
import { CheckCircle, DollarSign, Clock, ArrowDownCircle } from 'lucide-react'

interface SettlementOverviewProps {
  data: {
    totalApproved: number
    availableAmount: number
    pendingAmount: number
    totalWithdrawn: number
  }
}

export function SettlementOverview({ data }: SettlementOverviewProps) {
  const cards = [
    {
      label: '총 승인 건수',
      value: data.totalApproved.toString(),
      suffix: '건',
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      label: '출금 가능 금액',
      value: `$${data.availableAmount}`,
      icon: DollarSign,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
    },
    {
      label: '정산 대기중',
      value: `$${data.pendingAmount}`,
      icon: Clock,
      color: 'text-amber-600',
      bgColor: 'bg-amber-100',
    },
    {
      label: '누적 출금액',
      value: `$${data.totalWithdrawn}`,
      icon: ArrowDownCircle,
      color: 'text-accent',
      bgColor: 'bg-accent/10',
    },
  ]

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => (
        <Card key={card.label} className="border-none shadow-sm">
          <CardContent className="flex items-center gap-4 p-5">
            <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${card.bgColor}`}>
              <card.icon className={`h-6 w-6 ${card.color}`} />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">{card.label}</p>
              <p className="text-2xl font-bold">
                {card.value}
                {card.suffix && <span className="text-base font-normal text-muted-foreground">{card.suffix}</span>}
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
