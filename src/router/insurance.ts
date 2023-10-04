import Layout from '@/layouts/default/Layout.vue';

export default {
  path: '/insurance',
  component: Layout,
  children: [
    {
      name: 'insurance_TAX',
      path: '/insurance/V_PTAX10/:mainTabIdx',
      component: () => import('@/views/insurance/V_PTAX10.vue')
    },
    {
      name: 'insurance_ACC',
      path: '/insurance/V_PACC10/:mainTabIdx',
      component: () => import('@/views/insurance/V_PACC10.vue')
    }
  ]
};
