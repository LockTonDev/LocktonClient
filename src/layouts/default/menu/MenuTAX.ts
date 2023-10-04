export const MenuTAX = [
  {
    group: '/about',
    model: false,
    icon: 'homaboute',
    title: '회사소개',
    class: 'two-column',
    to: '/introduce',
    children: [
      {
        title: '회사소개',
        icon: 'mdi mdi-TAXount-circle',
        to: '/introduce'
      }
    ]
  },

  {
    group: '/contract',
    model: false,
    icon: 'home',
    title: '보험계약',
    class: 'two-column',
    to: '/contract/TAX/V_TTAX0030A10',
    children: [
      {
        title: '가입/조회/출력',
        icon: 'mdi mdi-TAXount-circle',
        to: '/contract/TAX/V_TTAX0030A10'
      },

      {
        title: '변경',
        icon: 'mdi mdi-TAXount-circle',
        to: '/contract/TAX/V_TTAX0040A10'
      }
    ]
  },

  {
    group: '/insurance',
    model: false,
    icon: 'inbox',
    title: '전문인배상책임보험',
    to: '/insurance/V_PTAX10/1',
    children: [
      {
        icon: 'mdi mdi-comment-outline',
        title: '특징',
        to: '/insurance/V_PTAX10/1'
      },

      {
        icon: 'mdi mdi-calendar',
        title: '보장사항',
        to: '/insurance/V_PTAX10/2'
      },
      {
        icon: 'mdi mdi-shopping',
        title: '가입절차',
        to: '/insurance/V_PTAX10/3'
      },
      {
        icon: 'mdi mdi-phone',
        title: '사고접수절차',
        to: '/insurance/V_PTAX10/4'
      }
    ]
  },
  {
    group: '/notice',
    model: false,
    icon: 'bar-chart-2',
    title: '알림마당',
    to: '/notice',
    children: [
      {
        title: '공지사항',
        icon: 'mdi mdi-alert',
        to: '/notice'
      },
      {
        title: '자주하는 질문',
        icon: 'mdi mdi-TAXount-circle',
        to: '/faq'
      },
      {
        title: '자료실',
        icon: 'mdi mdi-TAXount-circle',
        to: '/pds'
      }
    ]
  }
];
