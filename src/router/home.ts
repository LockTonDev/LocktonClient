import Layout from '@/layouts/default/BlankLayout.vue';

export default {
  path: '/',
  redirect: '/',
  component: Layout,
  children: [
    {
      name: 'home',
      path: '/',
      component: () => import('@/views/index.vue')
    },
    {
      name: 'error',
      path: '/error',
      component: () => import('@/views/error.vue')
    },
    {
      name: 'mobile',
      path: '/device/mobile',
      component: () => import('@/views/mobile.vue')
    },
    {
      name: 'login',
      path: '/user/login',
      component: () => import('@/views/user/login.vue')
    },
    {
      name: 'register',
      path: '/user/register/:business_cd',
      component: () => import('@/views/user/register.vue')
    }
  ]
};
