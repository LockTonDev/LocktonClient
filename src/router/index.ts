import {
  createRouter,
  createWebHistory,
  createWebHashHistory
} from 'vue-router';
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/stores';
import NotFound from '../components/NotFound.vue';

import homeRouter from './home';
import menuRouter from './menu';
import adminRouter from './admin';
import boardRouter from './board';
import userRouter from './user';
import insuranceRouter from './insurance';
import contractRouter from './contract';
import axios from 'axios';

const router = createRouter({
  history: createWebHashHistory('/'),
  // history: createWebHistory('/'),
  routes: [
    {
      path: '/:pathMatch(.*)*',
      component: NotFound
    },
    {
      path: '/lcksl-fr/lypts/sol01/login',
      component: () => import('@/views/admin/login.vue')
    },
    { ...homeRouter },
    { ...menuRouter },
    { ...adminRouter },
    { ...boardRouter },
    { ...userRouter },
    { ...insuranceRouter },
    { ...contractRouter }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  }
});

router.beforeEach(async function (to, from, next) {
  // redirect to login page if not logged in and trying to access a restricted page
  window.scrollTo(0, 0);

  const isMobile = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent || navigator.vendor || window.opera);

  // 모바일 디바이스에서 접속한 경우 리다이렉션
  if (isMobile) {
    if (to.path !== '/device/mobile') {
      next('/device/mobile');
      return; // Exit the function after calling next()
    }
  }

  const adminPages = [
    // 여기에 관리자만 접근 가능한 페이지 경로 추가
    '/lcksl-fr/lypts/sol01/login'
  ];

  const userPages = ['/', '/error', '/device/mobile', '/introduce', '/user/login',
    '/user/find', '/user/find/ACC', '/user/find/TAX', '/user/find/ADV',
    '/user/register/CAA', '/user/register/TAX', '/user/register/ACC', , '/user/register/ADV'];

  const authUserRequired = !userPages.includes(to.path);
  const authAdminRequired = !adminPages.includes(to.path);

  const authStore = useAuthStore();
  const { _AUTH_USER, _AUTH_ADMIN } = storeToRefs(authStore);

  if (to.path.indexOf('/lcksl-fr/lypts/sol01') !== -1) {

    try {
      const response = await axios.get('https://api.ip.pe.kr/json');
      const ipAddress = response.data.ip;

      const allowedIPs = ['110.9.11.206','121.137.148.62', '110.35.173.2'];

      // Add your IP blocking logic here
     /* if (!allowedIPs.includes(ipAddress)) {
        next('/error');
        return;
      }*/

      if (authAdminRequired && !_AUTH_ADMIN.value) {
        next('/lcksl-fr/lypts/sol01/login');
        return;
      }

    } catch (error) {
      console.error('Failed to retrieve IP address:', error);
      next('/error');
      return;
    }

    
  } else {
    if (authUserRequired && !_AUTH_USER.value) {
      next('/user/login');
      return;
    }
  }
  next();
});

export default router;
