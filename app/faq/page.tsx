import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { FAQList } from '@/components/faq/faq-list'
import { SupportCard } from '@/components/faq/support-card'

const faqs = [
  {
    category: '작업 방법',
    items: [
      {
        question: '작업은 어떤 순서로 진행하나요?',
        answer: '① 오늘의 인플루언서 리스트 확인 → ② "스크립트" 버튼으로 DM 문구 복사 → ③ "DM 발송" 버튼 클릭하여 SNS 프로필 접속 후 직접 DM 발송 → ④ 발송 완료 후 "컨택 완료" 버튼 클릭. 이 4단계로 1건의 작업이 완료됩니다.',
      },
      {
        question: '하루 목표(Daily Goal)는 몇 건인가요?',
        answer: '하루 100건이 기본 목표입니다. 매일 자정(KST 00:00)에 새로운 인플루언서 리스트가 할당됩니다. 당일 완료하지 못한 목표는 다음 날로 이월되지 않으니 참고해주세요.',
      },
      {
        question: '"컨택 완료"는 어떻게 인정되나요?',
        answer: '인플루언서에게 DM을 직접 발송한 뒤 시스템에서 "컨택 완료" 버튼을 눌러 기록하면 됩니다. 버튼 클릭 즉시 "승인 대기" 상태로 전환되며, 이후 브랜드사 검토를 거쳐 최종 승인/반려가 결정됩니다.',
      },
      {
        question: '하루에 100건 이상 작업할 수 있나요?',
        answer: '기본 할당량은 100건입니다. 우수 작업자 등급으로 승격되면 추가 할당을 요청할 수 있습니다. 자세한 내용은 관리자에게 문의해주세요.',
      },
    ],
  },
  {
    category: '승인 및 정산',
    items: [
      {
        question: '승인 결과는 어디서 확인하나요?',
        answer: '대시보드 홈의 "현재 승인된 수" 카드와 "내 작업" 페이지에서 실시간으로 확인할 수 있습니다. 컨택 완료 후 브랜드사 검토가 끝나면 상태가 자동으로 업데이트됩니다.',
      },
      {
        question: '정산은 어떻게 이루어지나요?',
        answer: '승인 완료 10건마다 $10의 정산 가능 금액이 생성됩니다(10-Unit Logic). 정산 페이지에서 출금 가능 금액이 $10 이상이면 언제든지 출금을 신청할 수 있습니다.',
      },
      {
        question: '출금은 얼마나 걸리나요?',
        answer: '출금 신청 후 영업일 기준 2~3일 내 처리됩니다. 계좌이체는 은행에 따라 1~2일 추가 소요될 수 있습니다.',
      },
      {
        question: '반려(Rejected) 처리된 건은 어떻게 하나요?',
        answer: '"내 작업" 페이지에서 반려 사유를 확인할 수 있습니다. 반려된 건은 정산에 포함되지 않습니다. 동일한 인플루언서에게 재컨택이 필요한 경우 관리자에게 문의해주세요.',
      },
    ],
  },
  {
    category: '문제 해결',
    items: [
      {
        question: 'SNS 계정이 차단되었어요.',
        answer: '하루 DM 발송량을 50건 이하로 유지하고, 발송 간격을 두는 것이 좋습니다. 스팸 감지로 계정이 제한된 경우 계정 복구 전까지 다른 SNS 플랫폼의 인플루언서를 먼저 작업하세요. 복구가 불가능하면 관리자에게 문의해주세요.',
      },
      {
        question: '인플루언서가 거절 답변을 보냈어요.',
        answer: '정중하게 감사 인사를 전하고, 해당 건은 "컨택 완료"로 기록해주세요. 거절 의사를 밝힌 인플루언서에게 강제로 재연락하면 브랜드 이미지에 부정적 영향을 줄 수 있습니다.',
      },
      {
        question: '"DM 발송" 버튼을 눌렀는데 페이지가 열리지 않아요.',
        answer: '브라우저의 팝업 차단 설정을 확인해주세요. 팝업 허용 후 다시 시도하거나, SNS 앱에서 직접 인플루언서를 검색하여 DM을 발송한 뒤 "컨택 완료"를 눌러주세요.',
      },
    ],
  },
]

export default function FAQPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">FAQ 및 지원</h1>
          <p className="text-muted-foreground">자주 묻는 질문과 문제 해결 가이드를 확인하세요.</p>
        </div>

        {/* Support Card */}
        <SupportCard />

        {/* FAQ List */}
        <FAQList faqs={faqs} />
      </div>
    </DashboardLayout>
  )
}
