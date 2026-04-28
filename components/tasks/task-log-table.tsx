'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { ClipboardList, ExternalLink, Instagram, Play } from 'lucide-react'
import type { TaskLog, Influencer } from '@/lib/types'

interface EnrichedTaskLog extends TaskLog {
  influencer?: Influencer
}

interface TaskLogTableProps {
  taskLogs: EnrichedTaskLog[]
}

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date))
}

function getStatusBadge(status: TaskLog['status']) {
  switch (status) {
    case 'approved':
      return <Badge className="bg-green-100 text-green-700 hover:bg-green-100">승인 완료</Badge>
    case 'pending':
      return <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100">승인 대기</Badge>
    case 'submitted':
      return <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">컨택 완료</Badge>
    case 'rejected':
      return <Badge className="bg-red-100 text-red-700 hover:bg-red-100">반려</Badge>
  }
}

function getPlatformIcon(platform?: string) {
  switch (platform) {
    case 'instagram':
      return Instagram
    case 'tiktok':
    case 'youtube':
      return Play
    default:
      return ExternalLink
  }
}

function formatFollowers(num?: number): string {
  if (!num) return '-'
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
  return num.toString()
}

export function TaskLogTable({ taskLogs }: TaskLogTableProps) {
  return (
    <Card className="border-none shadow-sm">
      <CardHeader className="flex flex-row items-center gap-2">
        <ClipboardList className="h-5 w-5 text-primary" />
        <CardTitle className="text-base font-medium">작업 기록</CardTitle>
        <Badge variant="secondary" className="ml-auto">
          총 {taskLogs.length}건
        </Badge>
      </CardHeader>
      <CardContent>
        {taskLogs.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <ClipboardList className="mb-3 h-12 w-12 text-muted-foreground/50" />
            <p className="text-muted-foreground">아직 작업 기록이 없습니다.</p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>인플루언서</TableHead>
                <TableHead>플랫폼</TableHead>
                <TableHead>팔로워</TableHead>
                <TableHead>브랜드</TableHead>
                <TableHead>컨택 날짜</TableHead>
                <TableHead>승인 상태</TableHead>
                <TableHead className="text-right">SNS 바로가기</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {taskLogs.map((log) => {
                const PlatformIcon = getPlatformIcon(log.influencer?.platform)
                return (
                  <TableRow key={log.id}>
                    <TableCell className="font-medium">
                      {log.influencer?.name || '-'}
                    </TableCell>
                    <TableCell>
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary">
                        <PlatformIcon className="h-4 w-4 text-primary" />
                      </div>
                    </TableCell>
                    <TableCell>
                      {formatFollowers(log.influencer?.followers)}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-xs">
                        {log.influencer?.brand || '-'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {formatDate(log.submittedAt)}
                    </TableCell>
                    <TableCell>{getStatusBadge(log.status)}</TableCell>
                    <TableCell className="text-right">
                      {log.influencer?.snsLink && (
                        <Button variant="ghost" size="sm" asChild>
                          <a
                            href={log.influencer.snsLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="gap-1.5"
                          >
                            <ExternalLink className="h-4 w-4" />
                            프로필
                          </a>
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  )
}
