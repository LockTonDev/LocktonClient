import Layout from '@/layouts/default/Layout.vue';

export default {
  path: '/insurance',
  component: Layout,
  children: [
    {
      name: 'insurance_PAT',
      path: '/insurance/V_PPAT10/:mainTabIdx',
      component: () => import('@/views/insurance/V_PPAT10.vue')
    },
    {
      name: 'insurance_ADV',
      path: '/insurance/V_PADV10/:mainTabIdx',
      component: () => import('@/views/insurance/V_PADV10.vue')
    },
    {
      name: 'insurance_TAX',
      path: '/insurance/V_PTAX10/:mainTabIdx',
      component: () => import('@/views/insurance/V_PTAX10.vue')
    },
    {
      name: 'insurance_ACC',
      path: '/insurance/V_PACC10/:mainTabIdx',
      component: () => import('@/views/insurance/V_PACC10.vue')
    },
    {
      name: 'insurance_CAA',
      path: '/insurance/V_PCAA10/:mainTabIdx',
      component: () => import('@/views/insurance/V_PCAA10.vue')
    },
    {
      name: 'insurance_LAW',
      path: '/insurance/V_PLAW10/:mainTabIdx',
      component: () => import('@/views/insurance/V_PLAW10.vue')
    }
  ]
};
