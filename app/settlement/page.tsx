import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { SettlementOverview } from '@/components/settlement/settlement-overview'
import { MilestoneProgress } from '@/components/settlement/milestone-progress'
import { WithdrawalCard } from '@/components/settlement/withdrawal-card'
import { WithdrawalHistoryTable } from '@/components/settlement/withdrawal-history'
import { mockWithdrawalHistory } from '@/lib/mock-data'

export default function SettlementPage() {
  const settlementData = {
    totalApproved: 127,
    availableAmount: 120,
    pendingAmount: 30,
    totalWithdrawn: 100,
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">정산 관리</h1>
          <p className="text-muted-foreground">정산 현황을 확인하고 출금을 신청하세요.</p>
        </div>

        {/* Overview Cards */}
        <SettlementOverview data={settlementData} />

        {/* Main Content Grid */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Left: Milestone Progress */}
          <MilestoneProgress 
            currentApproved={7} 
            targetApproved={10} 
            nextReward={10} 
          />

          {/* Right: Withdrawal Card */}
          <WithdrawalCard 
            availableAmount={settlementData.availableAmount}
            paymentMethod="PayPal"
            paymentDetails="worker@email.com"
          />
        </div>

        {/* Withdrawal History */}
        <WithdrawalHistoryTable history={mockWithdrawalHistory} />
      </div>
    </DashboardLayout>
  )
}
