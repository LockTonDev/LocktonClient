import Layout from '@/layouts/default/Layout.vue';

export default {
  path: '/contract',
  component: Layout,
  children: [
    /**
     * 법무사
     */
    {
      name: '[법무사] 보험계약신청/갱신',
      path: '/contract/LAW/V_TLAW0030A11',
      component: () => import('@/views/contract/LAW/V_TLAW0030A11.vue')
    },
    {
      name: '[법무사] 보험계약수정',
      path: '/contract/LAW/V_TLAW0030A11/:insuranceUUID?',
      component: () => import('@/views/contract/LAW/V_TLAW0030A11.vue')
    },
    {
      name: '[법무사] 보험계약상세조회',
      path: '/contract/LAW/V_TLAW0030A12/:insuranceUUID?',
      component: () => import('@/views/contract/LAW/V_TLAW0030A12.vue')
    },
    {
      name: '[법무사] 가입/조회/출력',
      path: '/contract/LAW/V_TLAW0030A10',
      component: () => import('@/views/contract/LAW/V_TLAW0030A10.vue')
    },

    {
      name: '[법무사] 변경',
      path: '/contract/LAW/V_TLAW0040A10',
      component: () => import('@/views/contract/LAW/V_TLAW0040A10.vue')
    },
      
    /**
     * 변리사
     */
    {
      name: '[변리사] 보험계약신청/갱신',
      path: '/contract/PAT/V_TPAT0030A11',
      component: () => import('@/views/contract/PAT/V_TPAT0030A11.vue')
    },
    {
      name: '[변리사] 보험계약수정',
      path: '/contract/PAT/V_TPAT0030A11/:insuranceUUID?',
      component: () => import('@/views/contract/PAT/V_TPAT0030A11.vue')
    },
    {
      name: '[변리사] 보험계약상세조회',
      path: '/contract/PAT/V_TPAT0030A12/:insuranceUUID?',
      component: () => import('@/views/contract/PAT/V_TPAT0030A12.vue')
    },
    {
      name: '[변리사] 가입/조회/출력',
      path: '/contract/PAT/V_TPAT0030A10',
      component: () => import('@/views/contract/PAT/V_TPAT0030A10.vue')
    },

    {
      name: '[변리사] 변경',
      path: '/contract/PAT/V_TPAT0040A10',
      component: () => import('@/views/contract/PAT/V_TPAT0040A10.vue')
    },

    /**
     * 관세사
     */
    {
      name: '[관세사] 보험계약신청/갱신',
      path: '/contract/CAA/V_TCAA0030A11',
      component: () => import('@/views/contract/CAA/V_TCAA0030A11.vue')
    },
    {
      name: '[관세사] 보험계약수정',
      path: '/contract/CAA/V_TCAA0030A11/:insuranceUUID?',
      component: () => import('@/views/contract/CAA/V_TCAA0030A11.vue')
    },
    {
      name: '[관세사] 보험계약상세조회',
      path: '/contract/CAA/V_TCAA0030A12/:insuranceUUID?',
      component: () => import('@/views/contract/CAA/V_TCAA0030A12.vue')
    },
    {
      name: '[관세사] 가입/조회/출력',
      path: '/contract/CAA/V_TCAA0030A10',
      component: () => import('@/views/contract/CAA/V_TCAA0030A10.vue')
    },

    {
      name: '[관세사] 변경',
      path: '/contract/CAA/V_TCAA0040A10',
      component: () => import('@/views/contract/CAA/V_TCAA0040A10.vue')
    },

    /**
     * 변호사
     */
    {
      name: '[변호사] 보험계약신청/갱신',
      path: '/contract/ADV/V_TADV0030A11',
      component: () => import('@/views/contract/ADV/V_TADV0030A11.vue')
    },
    {
      name: '[변호사] 보험계약수정',
      path: '/contract/ADV/V_TADV0030A11/:insuranceUUID?',
      component: () => import('@/views/contract/ADV/V_TADV0030A11.vue')
    },
    {
      name: '[변호사] 보험계약상세조회',
      path: '/contract/ADV/V_TADV0030A12/:insuranceUUID?',
      component: () => import('@/views/contract/ADV/V_TADV0030A12.vue')
    },
    {
      name: '[변호사] 가입/조회/출력',
      path: '/contract/ADV/V_TADV0030A10',
      component: () => import('@/views/contract/ADV/V_TADV0030A10.vue')
    },

    {
      name: '[변호사] 변경',
      path: '/contract/ADV/V_TADV0040A10',
      component: () => import('@/views/contract/ADV/V_TADV0040A10.vue')
    },

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
