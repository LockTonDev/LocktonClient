import Layout from '@/layouts/default/Layout.vue';

export default {
  path: '/contract',
  component: Layout,
  children: [
   
    /**
     * 회계사
     */
    {
      name: '[회계사] 보험계약신청/갱신',
      path: '/contract/ACC/V_TACC0030A11',
      component: () => import('@/views/contract/ACC/V_TACC0030A11.vue')
    },
    {
      name: '[회계사] 보험계약수정',
      path: '/contract/ACC/V_TACC0030A11/:insuranceUUID?',
      component: () => import('@/views/contract/ACC/V_TACC0030A11.vue')
    },
    {
      name: '[회계사] 보험계약상세조회',
      path: '/contract/ACC/V_TACC0030A12/:insuranceUUID?',
      component: () => import('@/views/contract/ACC/V_TACC0030A12.vue')
    },
    {
      name: '[회계사] 가입/조회/출력',
      path: '/contract/ACC/V_TACC0030A10',
      component: () => import('@/views/contract/ACC/V_TACC0030A10.vue')
    },

    {
      name: '[회계사] 변경',
      path: '/contract/ACC/V_TACC0040A10',
      component: () => import('@/views/contract/ACC/V_TACC0040A10.vue')
    },
    /**
     * 세무사
     */
    {
      name: '[세무사] 보험계약신청/갱신',
      path: '/contract/TAX/V_TTAX0030A11/:insuranceUUID?',
      component: () => import('@/views/contract/TAX/V_TTAX0030A11.vue')
    },
    {
      name: '[세무사] 보험계약상세조회',
      path: '/contract/TAX/V_TTAX0030A12/:insuranceUUID?',
      component: () => import('@/views/contract/TAX/V_TTAX0030A12.vue')
    },
    {
      name: '[세무사] 가입/조회/출력',
      path: '/contract/TAX/V_TTAX0030A10',
      component: () => import('@/views/contract/TAX/V_TTAX0030A10.vue')
    },

    {
      name: '[세무사] 변경',
      path: '/contract/TAX/V_TTAX0040A10',
      component: () => import('@/views/contract/TAX/V_TTAX0040A10.vue')
    }
   
  ]
};
