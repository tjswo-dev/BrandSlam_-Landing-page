import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { CampaignGuideList } from '@/components/guidelines/campaign-guide-list'
import { ScriptTemplateList } from '@/components/guidelines/script-template-list'
import { mockCampaignGuides, mockScriptTemplates } from '@/lib/mock-data'

export default function GuidelinesPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">가이드라인</h1>
          <p className="text-muted-foreground">브랜드별 캠페인 가이드와 섭외 스크립트를 확인하세요.</p>
        </div>

        {/* Campaign Guides */}
        <CampaignGuideList guides={mockCampaignGuides} />

        {/* Script Templates */}
        <ScriptTemplateList scripts={mockScriptTemplates} />
      </div>
    </DashboardLayout>
  )
}
