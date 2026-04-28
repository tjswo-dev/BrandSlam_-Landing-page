'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from '@/components/ui/pagination'
import { Copy, Check, Users, CheckCircle2, ExternalLink, Send, Search, RefreshCw, Sparkles } from 'lucide-react'
import type { Influencer } from '@/lib/types'
import { mockScriptTemplates } from '@/lib/mock-data'

const PAGE_SIZE = 10

type FilterTab = 'all' | 'carryover' | 'new'

interface InfluencerFullListProps {
  influencers: Influencer[]
}

function formatFollowers(num: number): string {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
  return num.toString()
}

function getPlatformColor(platform: string) {
  switch (platform) {
    case 'instagram': return 'from-pink-500 to-purple-600'
    case 'tiktok':    return 'from-gray-800 to-black'
    case 'youtube':   return 'from-red-500 to-red-600'
    default:          return 'from-blue-500 to-indigo-600'
  }
}

function getPlatformLabel(platform: string) {
  switch (platform) {
    case 'instagram': return 'IG'
    case 'tiktok':    return 'TT'
    case 'youtube':   return 'YT'
    default:          return platform.slice(0, 2).toUpperCase()
  }
}

export function InfluencerFullList({ influencers }: InfluencerFullListProps) {
  const [tab, setTab] = useState<FilterTab>('all')
  const [page, setPage] = useState(1)
  const [query, setQuery] = useState('')
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [contactedIds, setContactedIds] = useState<Set<string>>(new Set())
  const [selectedInfluencer, setSelectedInfluencer] = useState<Influencer | null>(null)
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false)

  const carryoverCount = influencers.filter(i => !i.isNew).length
  const newCount = influencers.filter(i => i.isNew).length

  const byTab = influencers.filter(i => {
    if (tab === 'carryover') return !i.isNew
    if (tab === 'new') return i.isNew
    return true
  })

  const filtered = byTab.filter(i =>
    i.name.toLowerCase().includes(query.toLowerCase()) ||
    i.country.toLowerCase().includes(query.toLowerCase()) ||
    i.brand.toLowerCase().includes(query.toLowerCase())
  )

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE)
  const startIndex = (page - 1) * PAGE_SIZE
  const paged = filtered.slice(startIndex, startIndex + PAGE_SIZE)

  const handleTabChange = (t: FilterTab) => { setTab(t); setPage(1) }
  const handleQueryChange = (value: string) => { setQuery(value); setPage(1) }

  const copyScript = (influencer: Influencer) => {
    const template = mockScriptTemplates.find(t => t.brand === influencer.brand)
    if (template) {
      const script = template.content.replace(/\[Name\]/g, influencer.name.split(' ')[0])
      navigator.clipboard.writeText(script)
      setCopiedId(influencer.id)
      setTimeout(() => setCopiedId(null), 2000)
    }
  }

  const openConfirmDialog = (influencer: Influencer) => {
    setSelectedInfluencer(influencer)
    setIsConfirmDialogOpen(true)
  }

  const handleContactComplete = () => {
    if (selectedInfluencer) {
      setContactedIds(prev => new Set(prev).add(selectedInfluencer.id))
    }
    setIsConfirmDialogOpen(false)
    setSelectedInfluencer(null)
  }

  const getPageNumbers = () => {
    const pages: (number | 'ellipsis')[] = []
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i)
    } else if (page <= 4) {
      for (let i = 1; i <= 5; i++) pages.push(i)
      pages.push('ellipsis')
      pages.push(totalPages)
    } else if (page >= totalPages - 3) {
      pages.push(1)
      pages.push('ellipsis')
      for (let i = totalPages - 4; i <= totalPages; i++) pages.push(i)
    } else {
      pages.push(1)
      pages.push('ellipsis')
      for (let i = page - 1; i <= page + 1; i++) pages.push(i)
      pages.push('ellipsis')
      pages.push(totalPages)
    }
    return pages
  }

  return (
    <>
      {/* Stats strip */}
      <div className="grid grid-cols-3 gap-4">
        <div className="rounded-xl border bg-card p-4 text-center shadow-sm">
          <p className="text-2xl font-bold">{influencers.length}</p>
          <p className="text-xs text-muted-foreground mt-0.5">오늘 전체</p>
        </div>
        <div className="rounded-xl border bg-amber-50 dark:bg-amber-900/10 border-amber-200 dark:border-amber-800 p-4 text-center shadow-sm">
          <div className="flex items-center justify-center gap-1 text-amber-600">
            <RefreshCw className="h-3.5 w-3.5" />
            <p className="text-2xl font-bold">{carryoverCount}</p>
          </div>
          <p className="text-xs text-amber-600/70 mt-0.5">이월 (전날 미완료)</p>
        </div>
        <div className="rounded-xl border bg-blue-50 dark:bg-blue-900/10 border-blue-200 dark:border-blue-800 p-4 text-center shadow-sm">
          <div className="flex items-center justify-center gap-1 text-blue-600">
            <Sparkles className="h-3.5 w-3.5" />
            <p className="text-2xl font-bold">{newCount}</p>
          </div>
          <p className="text-xs text-blue-600/70 mt-0.5">신규 (오늘 추가)</p>
        </div>
      </div>

      {/* Filter tabs + search */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        {/* Tabs */}
        <div className="flex rounded-lg border p-1 bg-muted/30">
          {([
            { key: 'all',       label: `전체 (${influencers.length})` },
            { key: 'carryover', label: `이월 (${carryoverCount})` },
            { key: 'new',       label: `신규 (${newCount})` },
          ] as { key: FilterTab; label: string }[]).map(({ key, label }) => (
            <button
              key={key}
              onClick={() => handleTabChange(key)}
              className={`flex-1 rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                tab === key
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="이름, 국가, 브랜드 검색..."
            value={query}
            onChange={e => handleQueryChange(e.target.value)}
            className="pl-9"
          />
        </div>

        <p className="whitespace-nowrap text-sm text-muted-foreground">
          컨택 완료 <span className="font-semibold text-emerald-600">{contactedIds.size}</span>명
          &nbsp;·&nbsp;
          {startIndex + 1}–{Math.min(startIndex + PAGE_SIZE, filtered.length)} / {filtered.length}명
        </p>
      </div>

      {/* List */}
      <Card className="border-none shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between border-b border-border/50 pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-pink-500 to-purple-600">
              <Users className="h-5 w-5 text-white" />
            </div>
            <div>
              <CardTitle className="text-lg font-semibold">인플루언서 리스트</CardTitle>
              <p className="text-sm text-muted-foreground">SNS 클릭 → DM 발송 → 컨택 완료</p>
            </div>
          </div>
          <Badge className="bg-gradient-to-r from-pink-500 to-purple-600 px-3 py-1 text-white">
            {filtered.length - [...contactedIds].filter(id => filtered.some(i => i.id === id)).length}명 남음
          </Badge>
        </CardHeader>

        <CardContent className="p-0">
          {paged.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <Search className="mb-3 h-12 w-12 text-muted-foreground/50" />
              <p className="text-muted-foreground">검색 결과가 없습니다.</p>
            </div>
          ) : (
            <div className="divide-y divide-border/50">
              {paged.map((influencer, index) => {
                const platformColor = getPlatformColor(influencer.platform)
                const platformLabel = getPlatformLabel(influencer.platform)
                const isContacted = contactedIds.has(influencer.id)
                const globalIndex = startIndex + index

                return (
                  <div
                    key={influencer.id}
                    className={`group flex items-center justify-between p-4 transition-colors ${
                      isContacted ? 'bg-emerald-50/30 dark:bg-emerald-900/10' : 'hover:bg-muted/30'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center text-sm font-medium text-muted-foreground">
                        #{globalIndex + 1}
                      </div>
                      <div className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${platformColor}`}>
                        <span className="text-xs font-bold text-white">{platformLabel}</span>
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <p className="font-semibold">{influencer.name}</p>
                          <Badge variant="outline" className="text-xs font-normal">{influencer.country}</Badge>
                          {influencer.isNew
                            ? <Badge className="bg-blue-100 text-blue-700 text-xs">신규</Badge>
                            : <Badge className="bg-amber-100 text-amber-700 text-xs">이월</Badge>
                          }
                          {isContacted && (
                            <Badge className="bg-emerald-100 text-emerald-700 text-xs">컨택 완료</Badge>
                          )}
                        </div>
                        <div className="mt-0.5 flex items-center gap-2 text-sm text-muted-foreground">
                          <span className="font-medium text-foreground">{formatFollowers(influencer.followers)}</span>
                          <span className="text-border">|</span>
                          <span>{influencer.brand}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 opacity-70 transition-opacity group-hover:opacity-100">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyScript(influencer)}
                        className="h-9 gap-1.5 border-border/50"
                        disabled={isContacted}
                      >
                        {copiedId === influencer.id ? (
                          <><Check className="h-4 w-4 text-emerald-500" /><span className="text-emerald-600">복사됨</span></>
                        ) : (
                          <><Copy className="h-4 w-4" />스크립트</>
                        )}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        asChild
                        className="h-9 gap-1.5 border-border/50"
                      >
                        <a href={influencer.snsLink} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4" />
                          DM 발송
                        </a>
                      </Button>
                      {isContacted ? (
                        <Button size="sm" disabled className="h-9 gap-1.5 bg-emerald-500 text-white cursor-default">
                          <CheckCircle2 className="h-4 w-4" />완료
                        </Button>
                      ) : (
                        <Button
                          size="sm"
                          onClick={() => openConfirmDialog(influencer)}
                          className="h-9 gap-1.5 bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-sm hover:from-pink-600 hover:to-purple-700"
                        >
                          <Send className="h-4 w-4" />
                          컨택 완료
                        </Button>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={e => { e.preventDefault(); setPage(p => Math.max(1, p - 1)) }}
                className={page === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
              />
            </PaginationItem>
            {getPageNumbers().map((p, i) =>
              p === 'ellipsis' ? (
                <PaginationItem key={`ellipsis-${i}`}>
                  <PaginationEllipsis />
                </PaginationItem>
              ) : (
                <PaginationItem key={p}>
                  <PaginationLink
                    href="#"
                    isActive={page === p}
                    onClick={e => { e.preventDefault(); setPage(p as number) }}
                    className="cursor-pointer"
                  >
                    {p}
                  </PaginationLink>
                </PaginationItem>
              )
            )}
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={e => { e.preventDefault(); setPage(p => Math.min(totalPages, p + 1)) }}
                className={page === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}

      {/* Confirm Dialog */}
      <Dialog open={isConfirmDialogOpen} onOpenChange={setIsConfirmDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>컨택 완료 확인</DialogTitle>
            <DialogDescription>
              <span className="font-medium text-foreground">{selectedInfluencer?.name}</span>님에게 DM을 발송하셨나요?
              <br />확인 시 승인 대기 상태로 기록됩니다.
            </DialogDescription>
          </DialogHeader>
          <div className="rounded-lg border border-border/50 bg-muted/30 p-4">
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <Send className="h-4 w-4 text-pink-500 shrink-0" />
              <span>DM 발송 후 브랜드사 검토를 거쳐 승인/반려 여부가 결정됩니다.</span>
            </div>
          </div>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="outline" onClick={() => setIsConfirmDialogOpen(false)}>취소</Button>
            <Button
              onClick={handleContactComplete}
              className="bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:from-pink-600 hover:to-purple-700"
            >
              <CheckCircle2 className="mr-2 h-4 w-4" />
              컨택 완료 기록
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
