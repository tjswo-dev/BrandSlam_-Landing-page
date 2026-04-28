import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { TaskLogTable } from '@/components/tasks/task-log-table'
import { TaskFilters } from '@/components/tasks/task-filters'
import { mockTaskLogs, mockInfluencers } from '@/lib/mock-data'

export default function TasksPage() {
  // Enrich task logs with influencer data
  const enrichedTaskLogs = mockTaskLogs.map(log => ({
    ...log,
    influencer: mockInfluencers.find(i => i.id === log.influencerId),
  }))

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">내 작업</h1>
          <p className="text-muted-foreground">제출한 작업 기록과 승인 상태를 확인하세요.</p>
        </div>

        {/* Filters */}
        <TaskFilters />

        {/* Task Log Table */}
        <TaskLogTable taskLogs={enrichedTaskLogs} />
      </div>
    </DashboardLayout>
  )
}
