export type Lang = 'ko' | 'en' | 'ja'

export const translations = {
  ko: {
    nav: {
      about: '브랜드 소개', success: '성공 사례',
      benefits: '크리에이터 혜택', how: '등록 방법', register: '크리에이터 등록',
    },
    hero: {
      badge: '지금 크리에이터 모집 중',
      title1: 'K-뷰티 제품 받고',
      title2: '콘텐츠 만들 크리에이터 구합니다',
      desc: 'TikTok · Instagram · YouTube 운영 중이라면 무료로 등록하세요. 제품 협찬 → 콘텐츠 제작 → 수익 창출까지 한 번에.',
      cta1: '지금 무료로 등록하기', cta2: '성공 사례 보기',
      campaignCta: '참여 가능한 캠페인 확인하기',
    },
    liveCampaigns: [
      '🔥 23YEARSOLD 신제품 캠페인 진행중',
      '💄 KOCOSTAR 마스크팩 캠페인 오픈',
      '💋 MANIA HOLIC Cheek Patch & Sunscreen 캠페인 진행중',
      '👁️ 아이월드 Advance Eye Cream 캠페인 모집중',
    ],
    stats: [
      { value: '30,000+', label: '활성 크리에이터' },
      { value: '50+',    label: '파트너 브랜드' },
      { value: '500M+',  label: '누적 조회수' },
      { value: '98%',    label: '재협업률' },
    ],
    about: {
      label: 'About Slam Global',
      title1: '한국의 뷰티 브랜드를',
      title2: '글로벌 크리에이터와 연결합니다',
      desc: '단순 광고가 아닌 진정성 있는 크리에이터 파트너십으로 브랜드와 크리에이터가 함께 성장하는 구조를 만듭니다.',
      brandsLabel: 'K-Beauty Brands',
      brandsDesc: '한국 뷰티 브랜드', brandsCount: '50개 이상 파트너',
      creatorsLabel: 'Global Creators',
      creatorsPlat: 'Instagram · TikTok · YouTube', creatorsRegion: '미국 · 일본 · 유럽 · 동남아',
    },
    success: {
      label: 'Success Stories',
      title1: '실제 크리에이터', title2: '성공 레퍼런스',
      desc: '슬램 글로벌과 함께한 크리에이터들의 실제 성장 지표를 확인하세요.',
    },
    stories: [
      {
        highlight: 'K-Beauty 협업 콘텐츠 하나로 채널 조회수가 10배 성장',
        stats: [{ value: '120만+', label: '단일 영상 조회수' }, { value: '10배', label: '채널 평균 조회수 증가' }],
      },
      {
        highlight: '협찬 콘텐츠 3개월 만에 팔로워 5만 명 순증가 달성',
        stats: [{ value: '5만+', label: '3개월 팔로워 순증가' }, { value: '5배', label: '계정 성장률' }],
      },
      {
        highlight: '15개 브랜드 파트너십으로 안정적인 월 수익 300만원 창출',
        stats: [{ value: '월 300만원+', label: '브랜드 협찬 수익' }, { value: '15개', label: '협업 브랜드 수' }],
      },
    ],
    partners: { label: 'Partner Brands', title1: '이 브랜드들과', title2: '함께할 수 있어요' },
    benefits: {
      label: 'Creator Benefits',
      title1: '크리에이터 등록 시', title2: '받을 수 있는 혜택',
      desc: '슬램 글로벌과 함께하면 K-Beauty 브랜드와 함께 성장할 수 있는 다양한 혜택을 누릴 수 있습니다.',
      items: [
        { title: '무료 K-Beauty 제품 수령',    desc: '협찬 제품을 직접 체험하고 진정성 있는 리뷰를 제작할 수 있습니다.' },
        { title: '콘텐츠 수익 정산',             desc: '5,000뷰 달성 시 $30 기본 지급, 이후 1,000뷰당 $6 추가 지급되는 투명한 수익 구조입니다.' },
        { title: '전담 매니저 1:1 지원',         desc: '캠페인 기획부터 콘텐츠 제작까지 전담 매니저가 함께합니다.' },
        { title: '독점 신제품 체험 우선권',       desc: '출시 전 신제품을 가장 먼저 경험하고 리뷰할 수 있는 우선권을 드립니다.' },
        { title: '글로벌 브랜드 파트너십',        desc: '한국·일본 50개 이상 뷰티 브랜드와의 지속적인 장기 협업 기회를 제공합니다.' },
        { title: 'SNS 성장 컨설팅',              desc: '팔로워 증가와 콘텐츠 퀄리티 향상을 위한 전략적 가이드를 제공합니다.' },
        { title: '정기 리워드 프로그램',          desc: '우수 크리에이터에게 분기별 추가 보너스와 스페셜 리워드를 지급합니다.' },
        { title: '글로벌 크리에이터 네트워크',    desc: '미국·유럽·일본·동남아 K-Beauty 크리에이터 커뮤니티에 참여할 수 있습니다.' },
      ],
    },
    how: {
      label: 'How to Join',
      title1: '3단계', title2: '로 시작하는 크리에이터 활동',
      desc: '복잡한 절차 없이 누구나 쉽고 빠르게 시작할 수 있습니다.',
      steps: [
        { step: '01', title: '무료 등록',       desc: '5분 안에 간단하게 크리에이터 등록을 완료합니다' },
        { step: '02', title: '제품 수령',       desc: '브랜드 협찬 제품을 집에서 편하게 받아봅니다' },
        { step: '03', title: '가이드에 맞게 제작', desc: '바이럴과 계정 성장을 위한 콘텐츠 가이드라인을 제공해드립니다' },
      ],
    },
    cta: {
      tags: ['무료 제품 협찬', '수익 창출', '전담 매니저', '글로벌 브랜드'],
      title: '지금 크리에이터로 등록하세요',
      desc: '무료 등록 후 바로 K-Beauty 브랜드 협찬을 시작할 수 있습니다.',
      btn: '무료로 시작하기',
    },
    footer: { dashboard: '대시보드', guidelines: '가이드라인', faq: 'FAQ', copy: '© 2024 Slam Global. All rights reserved.' },
  },

  en: {
    nav: {
      about: 'About', success: 'Success Stories',
      benefits: 'Creator Benefits', how: 'How to Join', register: 'Register Now',
    },
    hero: {
      badge: 'Now Recruiting Creators',
      title1: 'Get free K-Beauty products.',
      title2: 'Create content. Get paid.',
      desc: 'Running TikTok, Instagram, or YouTube? Register for free and start receiving K-Beauty brand deals — product sponsorship, content support, and revenue all in one place.',
      cta1: 'Register for Free', cta2: 'See Success Stories',
      campaignCta: 'View Open Campaigns',
    },
    liveCampaigns: [
      '🔥 23YEARSOLD New Product Campaign Live',
      '💄 KOCOSTAR Mask Pack Campaign Now Live',
      '💋 MANIA HOLIC Cheek Patch & Sunscreen Campaign Live',
      '👁️ iWorld Advance Eye Cream Campaign Open',
    ],
    stats: [
      { value: '30,000+', label: 'Active Creators' },
      { value: '50+',    label: 'Partner Brands' },
      { value: '500M+',  label: 'Total Views' },
      { value: '98%',    label: 'Re-collab Rate' },
    ],
    about: {
      label: 'About Slam Global',
      title1: 'Connecting Korean beauty brands',
      title2: 'with global creators',
      desc: 'We go beyond simple ads — building authentic creator partnerships where brands and creators grow together.',
      brandsLabel: 'K-Beauty Brands',
      brandsDesc: 'Korean Beauty Brands', brandsCount: '50+ Partners',
      creatorsLabel: 'Global Creators',
      creatorsPlat: 'Instagram · TikTok · YouTube', creatorsRegion: 'USA · Japan · Europe · SE Asia',
    },
    success: {
      label: 'Success Stories',
      title1: 'Real Creator', title2: 'Success References',
      desc: 'See real growth metrics from creators who partnered with Slam Global.',
    },
    stories: [
      {
        highlight: 'Channel views grew 10x with a single K-Beauty collab video',
        stats: [{ value: '1.2M+', label: 'Single video views' }, { value: '10x', label: 'Avg. channel view growth' }],
      },
      {
        highlight: 'Gained 50K followers in 3 months through sponsored content',
        stats: [{ value: '50K+', label: 'Follower growth in 3 mo.' }, { value: '5x', label: 'Account growth rate' }],
      },
      {
        highlight: 'Earning $2,200+/mo stably through 15 brand partnerships',
        stats: [{ value: '$2,200+/mo', label: 'Brand sponsorship income' }, { value: '15', label: 'Partner brands' }],
      },
    ],
    partners: { label: 'Partner Brands', title1: 'You can collaborate', title2: 'with these brands' },
    benefits: {
      label: 'Creator Benefits',
      title1: 'Benefits you receive', title2: 'when you register',
      desc: 'Joining Slam Global gives you a variety of perks to grow alongside top K-Beauty brands.',
      items: [
        { title: 'Free K-Beauty Product Samples',   desc: 'Receive sponsored products to experience and create authentic reviews.' },
        { title: 'Content Revenue Settlement',       desc: 'Earn $30 when your content hits 5,000 views, then $6 per additional 1,000 views — transparent and consistent.' },
        { title: 'Dedicated 1:1 Manager Support',   desc: 'A dedicated manager supports you from campaign planning to content creation.' },
        { title: 'Exclusive New Product Access',     desc: 'Be the first to experience and review new products before launch.' },
        { title: 'Global Brand Partnerships',        desc: 'Ongoing long-term collab opportunities with 50+ Korean & Japanese beauty brands.' },
        { title: 'SNS Growth Consulting',            desc: 'Strategic guidance to grow your following and improve content quality.' },
        { title: 'Regular Reward Program',           desc: 'Top creators receive quarterly bonuses and special rewards.' },
        { title: 'Global Creator Network',           desc: 'Join a K-Beauty creator community across the US, Europe, Japan & SE Asia.' },
      ],
    },
    how: {
      label: 'How to Join',
      title1: '3 Simple Steps', title2: ' to Start as a Creator',
      desc: 'No complicated process — anyone can start quickly and easily.',
      steps: [
        { step: '01', title: 'Register Free',    desc: 'Complete your creator registration in just 5 minutes' },
        { step: '02', title: 'Receive Products', desc: 'Get sponsored brand products delivered to your door' },
        { step: '03', title: 'Create with Guidelines', desc: 'We provide content guidelines for viral growth and account expansion' },
      ],
    },
    cta: {
      tags: ['Free Product Sponsorship', 'Revenue Generation', 'Dedicated Manager', 'Global Brands'],
      title: 'Register as a Creator Now',
      desc: 'Start receiving K-Beauty brand sponsorships right after free registration.',
      btn: 'Get Started Free',
    },
    footer: { dashboard: 'Dashboard', guidelines: 'Guidelines', faq: 'FAQ', copy: '© 2024 Slam Global. All rights reserved.' },
  },

  ja: {
    nav: {
      about: 'ブランド紹介', success: '成功事例',
      benefits: 'クリエイター特典', how: '登録方法', register: '登録する',
    },
    hero: {
      badge: 'クリエイター募集中',
      title1: 'K-Beautyの商品を受け取って',
      title2: 'コンテンツを作るクリエイター募集',
      desc: 'TikTok・Instagram・YouTubeで発信中なら無料で登録を。商品提供 → コンテンツ制作 → 収益化まで、まるごとサポート。',
      cta1: '無料で登録する', cta2: '成功事例を見る',
      campaignCta: '参加可能なキャンペーンを確認する',
    },
    liveCampaigns: [
      '🔥 23YEARSOLD 新商品キャンペーン進行中',
      '💄 KOCOSTAR マスクパックキャンペーンオープン',
      '💋 MANIA HOLIC Cheek Patch & Sunscreenキャンペーン進行中',
      '👁️ アイワールド Advance Eye Creamキャンペーン募集中',
    ],
    stats: [
      { value: '30,000+', label: 'アクティブクリエイター' },
      { value: '50+',    label: 'パートナーブランド' },
      { value: '500M+',  label: '累計再生数' },
      { value: '98%',    label: '再コラボ率' },
    ],
    about: {
      label: 'Slam Globalについて',
      title1: '韓国のビューティーブランドを',
      title2: 'グローバルクリエイターとつなぎます',
      desc: '単なる広告ではなく、誠実なクリエイターパートナーシップでブランドとクリエイターが共に成長する仕組みを作ります。',
      brandsLabel: 'K-Beautyブランド',
      brandsDesc: '韓国のビューティーブランド', brandsCount: '50社以上のパートナー',
      creatorsLabel: 'グローバルクリエイター',
      creatorsPlat: 'Instagram · TikTok · YouTube', creatorsRegion: '米国・日本・欧州・東南アジア',
    },
    success: {
      label: '成功事例',
      title1: 'リアルクリエイターの', title2: '成功レファレンス',
      desc: 'Slam Globalと提携したクリエイターたちの実際の成長指標をご確認ください。',
    },
    stories: [
      {
        highlight: 'K-Beautyコラボ動画1本でチャンネル再生数が10倍に成長',
        stats: [{ value: '120万+', label: '単一動画再生数' }, { value: '10倍', label: 'チャンネル平均再生数増加' }],
      },
      {
        highlight: '提供コンテンツ開始3ヶ月でフォロワー5万人純増を達成',
        stats: [{ value: '5万+', label: '3ヶ月フォロワー純増' }, { value: '5倍', label: 'アカウント成長率' }],
      },
      {
        highlight: '15ブランドパートナーシップで月収200万円以上を安定的に創出',
        stats: [{ value: '月200万円+', label: 'ブランド提供収益' }, { value: '15社', label: 'コラボブランド数' }],
      },
    ],
    partners: { label: 'パートナーブランド', title1: 'これらのブランドと', title2: 'コラボできます' },
    benefits: {
      label: 'クリエイター特典',
      title1: '登録すると', title2: '受けられる特典',
      desc: 'Slam Globalに参加すると、K-Beautyブランドと共に成長できる様々な特典をご活用いただけます。',
      items: [
        { title: '無料K-Beauty商品の受け取り',      desc: '提供商品を実際に体験し、誠実なレビューを制作できます。' },
        { title: 'コンテンツ収益の精算',             desc: '5,000再生達成で$30を基本支給、以降1,000再生ごとに$6追加支給される透明な収益構造です。' },
        { title: '専任マネージャーの1:1サポート',    desc: 'キャンペーン企画からコンテンツ制作まで専任マネージャーがサポートします。' },
        { title: '新商品優先体験権',                 desc: '発売前の新商品をいち早く体験・レビューできる優先権をご提供します。' },
        { title: 'グローバルブランドパートナーシップ',desc: '韓国・日本50社以上のビューティーブランドとの長期コラボ機会を提供します。' },
        { title: 'SNS成長コンサルティング',          desc: 'フォロワー増加とコンテンツ品質向上のための戦略的ガイドを提供します。' },
        { title: '定期リワードプログラム',            desc: '優秀クリエイターに四半期ごとの追加ボーナスとスペシャルリワードを支給します。' },
        { title: 'グローバルクリエイターネットワーク',desc: '米国・欧州・日本・東南アジアのK-Beautyクリエイターコミュニティに参加できます。' },
      ],
    },
    how: {
      label: '登録方法',
      title1: '3ステップ', title2: 'で始めるクリエイター活動',
      desc: '複雑な手続きなしに、誰でも簡単にすぐ始められます。',
      steps: [
        { step: '01', title: '無料登録',         desc: '5分でクリエイター登録を完了できます' },
        { step: '02', title: '商品受け取り',     desc: 'ブランド提供商品を自宅で受け取ります' },
        { step: '03', title: 'ガイドに沿って制作', desc: 'バイラルとアカウント成長のためのコンテンツガイドラインを提供します' },
      ],
    },
    cta: {
      tags: ['無料商品提供', '収益化', '専任マネージャー', 'グローバルブランド'],
      title: '今すぐクリエイター登録',
      desc: '無料登録後すぐにK-Beautyブランドの商品提供を受け取れます。',
      btn: '無料で始める',
    },
    footer: { dashboard: 'ダッシュボード', guidelines: 'ガイドライン', faq: 'FAQ', copy: '© 2024 Slam Global. All rights reserved.' },
  },
} as const
