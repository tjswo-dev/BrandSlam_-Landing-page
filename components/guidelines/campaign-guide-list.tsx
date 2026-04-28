'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Megaphone, Copy, Check, Hash } from 'lucide-react'
import type { CampaignGuide } from '@/lib/types'

interface CampaignGuideListProps {
  guides: CampaignGuide[]
}

export function CampaignGuideList({ guides }: CampaignGuideListProps) {
  const [selectedGuide, setSelectedGuide] = useState<CampaignGuide | null>(null)
  const [copiedHashtags, setCopiedHashtags] = useState(false)

  const copyHashtags = (hashtags: string[]) => {
    navigator.clipboard.writeText(hashtags.join(' '))
    setCopiedHashtags(true)
    setTimeout(() => setCopiedHashtags(false), 2000)
  }

  return (
    <>
      <Card className="border-none shadow-sm">
        <CardHeader className="flex flex-row items-center gap-2">
          <Megaphone className="h-5 w-5 text-accent" />
          <CardTitle className="text-base font-medium">캠페인 가이드</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {guides.map((guide) => (
              <div
                key={guide.id}
                className="group cursor-pointer rounded-xl border border-border bg-card p-5 transition-all hover:border-accent hover:shadow-md"
                onClick={() => setSelectedGuide(guide)}
              >
                <div className="mb-3 flex items-center justify-between">
                  <Badge variant="secondary" className="bg-primary/10 text-primary">
                    {guide.brand}
                  </Badge>
                </div>
                <h3 className="mb-2 font-semibold group-hover:text-accent">{guide.title}</h3>
                <p className="line-clamp-2 text-sm text-muted-foreground">{guide.description}</p>
                <div className="mt-3 flex flex-wrap gap-1">
                  {guide.hashtags.slice(0, 2).map((tag) => (
                    <span key={tag} className="text-xs text-muted-foreground">
                      {tag}
                    </span>
                  ))}
                  {guide.hashtags.length > 2 && (
                    <span className="text-xs text-muted-foreground">
                      +{guide.hashtags.length - 2}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Detail Dialog */}
      <Dialog open={!!selectedGuide} onOpenChange={() => setSelectedGuide(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="bg-primary/10 text-primary">
                {selectedGuide?.brand}
              </Badge>
            </div>
            <DialogTitle className="text-xl">{selectedGuide?.title}</DialogTitle>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <div>
              <h4 className="mb-2 text-sm font-medium text-muted-foreground">캠페인 설명</h4>
              <p className="text-foreground">{selectedGuide?.description}</p>
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between">
                <h4 className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                  <Hash className="h-4 w-4" />
                  필수 해시태그
                </h4>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => selectedGuide && copyHashtags(selectedGuide.hashtags)}
                  className="gap-1.5 text-xs"
                >
                  {copiedHashtags ? (
                    <>
                      <Check className="h-3 w-3 text-green-600" />
                      복사됨
                    </>
                  ) : (
                    <>
                      <Copy className="h-3 w-3" />
                      전체 복사
                    </>
                  )}
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {selectedGuide?.hashtags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-sm">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="rounded-lg bg-muted/50 p-4">
              <h4 className="mb-2 text-sm font-medium">주의사항</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>- 인플루언서에게 제품 협찬 시 반드시 필수 해시태그를 포함하도록 안내해주세요.</li>
                <li>- 콘텐츠 업로드 전 브랜드 승인을 받도록 가이드해주세요.</li>
                <li>- 경쟁사 제품과 함께 노출되지 않도록 주의해주세요.</li>
              </ul>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
