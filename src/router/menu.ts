import Layout from '@/layouts/default/Layout.vue';

export default {
  path: '/main',
  redirect: '/',
  component: Layout,
  children: [
    {
      name: 'introduce',
      path: '/introduce',
      component: () => import('@/views/introduce.vue')
    }
  ]
};
