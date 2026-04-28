'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { History } from 'lucide-react'
import type { WithdrawalHistory } from '@/lib/types'

interface WithdrawalHistoryTableProps {
  history: WithdrawalHistory[]
}

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date(date))
}

function getStatusBadge(status: WithdrawalHistory['status']) {
  switch (status) {
    case 'completed':
      return <Badge className="bg-green-100 text-green-700 hover:bg-green-100">완료</Badge>
    case 'pending':
      return <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100">처리중</Badge>
    case 'failed':
      return <Badge className="bg-red-100 text-red-700 hover:bg-red-100">실패</Badge>
  }
}

export function WithdrawalHistoryTable({ history }: WithdrawalHistoryTableProps) {
  return (
    <Card className="border-none shadow-sm">
      <CardHeader className="flex flex-row items-center gap-2">
        <History className="h-5 w-5 text-muted-foreground" />
        <CardTitle className="text-base font-medium">출금 내역</CardTitle>
      </CardHeader>
      <CardContent>
        {history.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <History className="mb-3 h-12 w-12 text-muted-foreground/50" />
            <p className="text-muted-foreground">아직 출금 내역이 없습니다.</p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>신청일</TableHead>
                <TableHead>금액</TableHead>
                <TableHead>처리일</TableHead>
                <TableHead>상태</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {history.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{formatDate(item.requestedAt)}</TableCell>
                  <TableCell className="font-medium">${item.amount}</TableCell>
                  <TableCell>
                    {item.processedAt ? formatDate(item.processedAt) : '-'}
                  </TableCell>
                  <TableCell>{getStatusBadge(item.status)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  )
}
