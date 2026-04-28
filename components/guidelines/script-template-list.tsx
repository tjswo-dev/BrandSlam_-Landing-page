'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { MessageSquare, Copy, Check, Globe } from 'lucide-react'
import type { ScriptTemplate } from '@/lib/types'

interface ScriptTemplateListProps {
  scripts: ScriptTemplate[]
}

export function ScriptTemplateList({ scripts }: ScriptTemplateListProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const brands = Array.from(new Set(scripts.map(s => s.brand)))

  const copyScript = (script: ScriptTemplate) => {
    navigator.clipboard.writeText(script.content)
    setCopiedId(script.id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  return (
    <Card className="border-none shadow-sm">
      <CardHeader className="flex flex-row items-center gap-2">
        <MessageSquare className="h-5 w-5 text-primary" />
        <CardTitle className="text-base font-medium">섭외 스크립트</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue={brands[0]} className="w-full">
          <TabsList className="mb-4 w-full justify-start">
            {brands.map((brand) => (
              <TabsTrigger key={brand} value={brand} className="px-4">
                {brand}
              </TabsTrigger>
            ))}
          </TabsList>
          {brands.map((brand) => (
            <TabsContent key={brand} value={brand} className="space-y-4">
              {scripts
                .filter((s) => s.brand === brand)
                .map((script) => (
                  <div
                    key={script.id}
                    className="rounded-xl border border-border bg-card p-5"
                  >
                    <div className="mb-3 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Globe className="h-4 w-4 text-muted-foreground" />
                        <Badge variant="outline">{script.country}</Badge>
                        <Badge variant="secondary">{script.language}</Badge>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyScript(script)}
                        className="gap-1.5"
                      >
                        {copiedId === script.id ? (
                          <>
                            <Check className="h-4 w-4 text-green-600" />
                            복사됨
                          </>
                        ) : (
                          <>
                            <Copy className="h-4 w-4" />
                            복사하기
                          </>
                        )}
                      </Button>
                    </div>
                    <pre className="whitespace-pre-wrap rounded-lg bg-muted/50 p-4 text-sm leading-relaxed">
                      {script.content}
                    </pre>
                  </div>
                ))}
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  )
}
