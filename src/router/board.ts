import Layout from '@/layouts/default/Layout.vue';

export default {
  path: '/board',
  component: Layout,
  children: [
    {
      name: 'notice',
      path: '/notice',
      component: () => import('@/views/board/notice.vue')
    },
    {
      name: 'faq',
      path: '/faq',
      component: () => import('@/views/board/faq.vue')
    },
    {
      name: 'pds',
      path: '/pds',
      component: () => import('@/views/board/pds.vue')
    },
    {
      name: 'BoardView',
      path: '/board/:board_id/:board_no',
      component: () => import('@/components/BoardView.vue')
    }
  ]
};
