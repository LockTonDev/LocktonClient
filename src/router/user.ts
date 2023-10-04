import Layout from '@/layouts/default/Layout.vue';

export default {
  path: '/user',
  component: Layout,
  children: [
    {
      name: 'logout',
      path: '/user/logout',
      component: () => import('@/views/user/logout.vue')
    },

    {
      name: 'mypage',
      path: '/user/mypage/',
      component: () => import('@/views/user/mypage.vue')
    },
    {
      name: 'find',
      path: '/user/find/:business_cd',
      component: () => import('@/views/user/find.vue')
    }
  ]
};
