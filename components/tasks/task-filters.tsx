'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Search, Filter } from 'lucide-react'

export function TaskFilters() {
  return (
    <Card className="border-none shadow-sm">
      <CardContent className="flex flex-wrap items-center gap-4 p-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="인플루언서 이름으로 검색..."
            className="pl-9"
          />
        </div>
        <Select defaultValue="all">
          <SelectTrigger className="w-40">
            <Filter className="mr-2 h-4 w-4" />
            <SelectValue placeholder="상태 필터" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">전체</SelectItem>
            <SelectItem value="pending">승인 대기</SelectItem>
            <SelectItem value="approved">승인 완료</SelectItem>
            <SelectItem value="rejected">반려</SelectItem>
          </SelectContent>
        </Select>
        <Select defaultValue="all">
          <SelectTrigger className="w-40">
            <SelectValue placeholder="브랜드 필터" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">전체 브랜드</SelectItem>
            <SelectItem value="glowup">GlowUp Cosmetics</SelectItem>
            <SelectItem value="kbeauty">K-Beauty Lab</SelectItem>
            <SelectItem value="seoul">Seoul Glow</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" size="sm">
          필터 초기화
        </Button>
      </CardContent>
    </Card>
  )
}
