export const MenuDEF = [
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
        icon: 'mdi mdi-account-circle',
        to: '/introduce'
      }
    ]
  }
];
