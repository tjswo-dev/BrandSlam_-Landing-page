'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Copy, Check, Users, CheckCircle2, ExternalLink, ArrowRight, Send } from 'lucide-react'
import type { Influencer } from '@/lib/types'
import { mockScriptTemplates } from '@/lib/mock-data'

const DASHBOARD_LIMIT = 10

interface InfluencerListProps {
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

export function InfluencerList({ influencers }: InfluencerListProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [contactedIds, setContactedIds] = useState<Set<string>>(new Set())
  const [selectedInfluencer, setSelectedInfluencer] = useState<Influencer | null>(null)
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false)

  const displayed = influencers.slice(0, DASHBOARD_LIMIT)
  const totalCount = influencers.length

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

  return (
    <>
      <Card className="border-none shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between border-b border-border/50 pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-pink-500 to-purple-600">
              <Users className="h-5 w-5 text-white" />
            </div>
            <div>
              <Link href="/influencers" className="group flex items-center gap-1.5 hover:opacity-80 transition-opacity">
                <CardTitle className="text-lg font-semibold">오늘의 인플루언서 리스트</CardTitle>
                <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 -translate-x-1 transition-all group-hover:opacity-100 group-hover:translate-x-0" />
              </Link>
              <p className="text-sm text-muted-foreground">SNS 아이콘 클릭 → DM 발송 → 컨택 완료</p>
            </div>
          </div>
          <Badge className="bg-gradient-to-r from-pink-500 to-purple-600 px-3 py-1 text-white">
            {displayed.length - [...contactedIds].filter(id => displayed.some(i => i.id === id)).length}명 남음
          </Badge>
        </CardHeader>

        <CardContent className="p-0">
          <div className="divide-y divide-border/50">
            {displayed.map((influencer, index) => {
              const platformColor = getPlatformColor(influencer.platform)
              const platformLabel = getPlatformLabel(influencer.platform)
              const isContacted = contactedIds.has(influencer.id)
              return (
                <div
                  key={influencer.id}
                  className={`group flex items-center justify-between p-4 transition-colors ${isContacted ? 'bg-emerald-50/30 dark:bg-emerald-900/10' : 'hover:bg-muted/30'}`}
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center text-sm font-medium text-muted-foreground">
                      #{index + 1}
                    </div>
                    <div className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${platformColor}`}>
                      <span className="text-xs font-bold text-white">{platformLabel}</span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
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

          {/* 전체 보기 링크 */}
          <div className="border-t border-border/50 px-4 py-3">
            <Link href="/influencers">
              <Button variant="ghost" className="w-full gap-2 text-muted-foreground hover:text-foreground">
                전체 {totalCount}명 보기
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Contact Complete Confirmation Dialog */}
      <Dialog open={isConfirmDialogOpen} onOpenChange={setIsConfirmDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>컨택 완료 확인</DialogTitle>
            <DialogDescription>
              <span className="font-medium text-foreground">{selectedInfluencer?.name}</span>님에게 DM을 발송하셨나요?
              <br />
              확인 시 승인 대기 상태로 기록됩니다.
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
