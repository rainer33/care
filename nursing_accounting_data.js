window.mockupData = {
  pageMeta: {
    scope: {
      title: "핵심 기능 리스트",
      description: "요구사항에서 실제로 필요한 최소 범위를 화면 기준으로 정리했습니다."
    },
    dashboard: {
      title: "MVP 대시보드",
      description: "수집 현황, 미분류 거래, 전표 진행 상태만 보여주는 최소 대시보드입니다."
    },
    settings: {
      title: "기본정보 및 API 연동 설정",
      description: "기관 기본정보와 금융기관 API, 카드 API 연결 상태를 관리합니다."
    },
    transactions: {
      title: "거래내역 관리",
      description: "수집된 거래를 조회하고 회계 입력값을 보정합니다."
    },
    vouchers: {
      title: "자동전표 관리",
      description: "자동 생성된 전표 초안을 검토하고 확정합니다."
    },
    admin: {
      title: "관리자 기본 운영",
      description: "기관 관리, 서비스 상태 관리, 기본 통계/모니터링만 포함합니다."
    }
  },
  featureGroups: [
    {
      title: "기관 사용자 핵심 기능",
      badge: "good",
      items: [
        "기관 로그인",
        "기관 기본정보 등록",
        "사업자정보 등록",
        "인증서 등록",
        "은행 계좌 등록",
        "법인카드 등록"
      ]
    },
    {
      title: "금융 연동 핵심 기능",
      badge: "info",
      items: [
        "금융기관 API 연동",
        "카드 API 연동",
        "연동 상태 확인",
        "수집 이력 확인",
        "실패 / 재인증 상태 확인"
      ]
    },
    {
      title: "회계 자동화 핵심 기능",
      badge: "pending",
      items: [
        "거래내역 자동 수집",
        "거래내역 조회 / 상세 조회",
        "거래처 입력 / 수정",
        "계정과목 입력 / 수정",
        "미분류 거래 관리",
        "자동전표 생성",
        "전표 조회 / 수정 / 삭제 / 확정"
      ]
    },
    {
      title: "관리자 최소 기능",
      badge: "good",
      items: [
        "기관 목록 조회",
        "기관 상태 관리",
        "서비스 상태 관리",
        "회원별 사용량 요약 조회",
        "수집 실패 건수 모니터링",
        "기본 통계 대시보드"
      ]
    }
  ],
  screenFlow: [
    "기능 리스트",
    "대시보드",
    "연동 설정",
    "거래내역 관리",
    "전표 관리",
    "관리자"
  ],
  summaryCards: [
    { label: "연동 계정", value: "4개", meta: "은행 2 · 카드 2" },
    { label: "오늘 수집 거래", value: "32건", meta: "최근 수집 09:30" },
    { label: "미분류 거래", value: "3건", meta: "즉시 검토 필요" },
    { label: "전표 확정", value: "29건", meta: "자동생성 후 검토 완료" }
  ],
  workflow: [
    { title: "금융기관 API 수집", detail: "은행 거래 18건 수집 완료", status: "완료" },
    { title: "카드 API 수집", detail: "법인카드 거래 14건 수집 완료", status: "완료" },
    { title: "미분류 거래 검토", detail: "주유비 1건, 관리비 2건 확인 필요", status: "대기" },
    { title: "전표 확정", detail: "검토 완료 거래를 전표로 확정", status: "진행중" }
  ],
  connections: [
    { name: "국민은행 주계좌", detail: "금융기관 API 연결 정상", state: "good", label: "정상" },
    { name: "신한은행 운영계좌", detail: "금융기관 API 연결 정상", state: "good", label: "정상" },
    { name: "법인카드 A", detail: "카드 API 수집 정상", state: "good", label: "정상" },
    { name: "법인카드 B", detail: "재인증 필요", state: "pending", label: "재인증" }
  ],
  settingsForm: [
    { label: "기관명", value: "행복요양센터" },
    { label: "사업자등록번호", value: "123-45-67890" },
    { label: "인증서 상태", value: "등록 완료" },
    { label: "수집 주기", value: "매일 2회" },
    { label: "비고", value: "금융기관 API와 카드 API를 통해 거래를 수집하고 자동전표를 생성합니다.", type: "textarea", full: true }
  ],
  onboardingChecklist: [
    { title: "기관 기본정보 등록", done: true },
    { title: "인증서 등록", done: true },
    { title: "은행 계좌 연결", done: true },
    { title: "법인카드 연결", done: true },
    { title: "연동 실패 모니터링 확인", done: false }
  ],
  transactions: [
    {
      id: 214,
      date: "2026-04-18 08:52",
      type: "은행입금",
      category: "income",
      merchant: "국민건강보험공단",
      memo: "장기요양 급여 입금",
      amount: 1280000,
      account: "요양급여수익",
      status: "ready",
      statusLabel: "확정 가능",
      voucherNo: "JV-202604-00214",
      source: "국민은행 주계좌",
      note: "장기요양 급여 수익으로 자동 분류되었습니다.",
      rules: [
        "거래구분 = 은행입금",
        "적요 키워드 = 장기요양 / 급여",
        "반복 입금 패턴 일치"
      ],
      checklist: [
        { label: "거래처 확인", done: true },
        { label: "계정과목 확인", done: true },
        { label: "최종 승인", done: false }
      ],
      lines: [
        { side: "차변 / 보통예금", desc: "국민은행 주계좌", debit: "1,280,000", credit: "0" },
        { side: "대변 / 요양급여수익", desc: "장기요양 급여 입금", debit: "0", credit: "1,280,000" }
      ]
    },
    {
      id: 213,
      date: "2026-04-18 08:20",
      type: "카드지출",
      category: "expense",
      merchant: "메디컬스토어",
      memo: "의료소모품 구매",
      amount: 184000,
      account: "소모품비",
      status: "booked",
      statusLabel: "전표 생성",
      voucherNo: "JV-202604-00213",
      source: "법인카드 A",
      note: "카드 API 수집 거래로 자동전표가 생성되었습니다.",
      rules: [
        "거래구분 = 카드지출",
        "거래처 키워드 = 메디컬 / 소모품",
        "소모품비 규칙 적용"
      ],
      checklist: [
        { label: "거래처 확인", done: true },
        { label: "계정과목 확인", done: true },
        { label: "최종 승인", done: true }
      ],
      lines: [
        { side: "차변 / 소모품비", desc: "의료소모품 구매", debit: "184,000", credit: "0" },
        { side: "대변 / 보통예금", desc: "법인카드 결제", debit: "0", credit: "184,000" }
      ]
    },
    {
      id: 212,
      date: "2026-04-17 17:12",
      type: "카드지출",
      category: "expense",
      merchant: "에너지주유소",
      memo: "차량 연료비",
      amount: 76000,
      account: "미지정",
      status: "review",
      statusLabel: "검토 필요",
      voucherNo: "JV-202604-00212",
      source: "법인카드 A",
      note: "계정과목 지정이 필요합니다.",
      rules: [
        "거래구분 = 카드지출",
        "거래처 키워드 = 주유",
        "차량유지비 후보"
      ],
      checklist: [
        { label: "거래처 확인", done: true },
        { label: "계정과목 확인", done: false },
        { label: "최종 승인", done: false }
      ],
      lines: [
        { side: "차변 / 차량유지비 후보", desc: "차량 연료비", debit: "76,000", credit: "0" },
        { side: "대변 / 보통예금", desc: "법인카드 결제", debit: "0", credit: "76,000" }
      ]
    }
  ],
  organizations: [
    {
      name: "행복요양센터",
      state: "운영중",
      service: "정상",
      login: "오늘 09:32",
      usage: "거래 1,240건 / 전표 882건",
      failures: "수집 실패 0건"
    },
    {
      name: "새봄재가센터",
      state: "운영중",
      service: "정상",
      login: "오늘 08:10",
      usage: "거래 620건 / 전표 411건",
      failures: "수집 실패 1건"
    },
    {
      name: "든든방문요양",
      state: "체험중",
      service: "주의",
      login: "어제 17:40",
      usage: "거래 124건 / 전표 53건",
      failures: "카드 재인증 필요"
    }
  ],
  adminMetrics: [
    { label: "총 기관 수", value: "27개", meta: "활성 23개" },
    { label: "수집 실패 건수", value: "3건", meta: "재인증 포함" },
    { label: "미분류 거래", value: "12건", meta: "기관 전체 합산" },
    { label: "자동전표율", value: "68%", meta: "기관 평균 기준" }
  ]
};
