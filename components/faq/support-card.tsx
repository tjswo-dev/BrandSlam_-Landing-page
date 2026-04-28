'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { MessageCircle, Mail, Clock } from 'lucide-react'

export function SupportCard() {
  return (
    <Card className="border-none bg-gradient-to-r from-primary to-primary/80 shadow-sm">
      <CardContent className="flex flex-col items-center justify-between gap-6 p-6 sm:flex-row">
        <div className="text-center text-primary-foreground sm:text-left">
          <h2 className="mb-1 text-lg font-semibold">도움이 필요하신가요?</h2>
          <p className="text-sm opacity-90">
            FAQ에서 답을 찾지 못하셨다면 지원팀에 문의해주세요.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          <Button variant="secondary" className="gap-2">
            <MessageCircle className="h-4 w-4" />
            실시간 채팅
          </Button>
          <Button variant="secondary" className="gap-2">
            <Mail className="h-4 w-4" />
            이메일 문의
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export function ResponseTimeCard() {
  return (
    <div className="flex items-center gap-3 rounded-lg bg-muted/50 p-4">
      <Clock className="h-5 w-5 text-muted-foreground" />
      <div>
        <p className="text-sm font-medium">평균 응답 시간</p>
        <p className="text-xs text-muted-foreground">영업시간 내 2시간 이내</p>
      </div>
    </div>
  )
}
