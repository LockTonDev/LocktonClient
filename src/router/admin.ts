import Layout from '@/layouts/admin/Layout.vue';
const adminPath = 'lcksl-fr/lypts/sol01';

export default {
  path: `/${adminPath}`,
  component: Layout,
  children: [
    {
      name: `AC2`,
      path: `/${adminPath}/dev/AC2/:business_cd`,
      component: () => import(`@/views/admin/dev/AC2.vue`)
    },
    {
      name: `AC3`,
      path: `/${adminPath}/dev/AC3/:business_cd`,
      component: () => import(`@/views/admin/dev/AC3.vue`)
    },
    {
      name: `AC4`,
      path: `/${adminPath}/dev/AC4/:business_cd`,
      component: () => import(`@/views/admin/dev/AC4.vue`)
    },
    {
      name: `AC5`,
      path: `/${adminPath}/dev/AC5/:business_cd`,
      component: () => import(`@/views/admin/dev/AC5.vue`)
    },
    {
      name: `AC6`,
      path: `/${adminPath}/dev/AC6/:business_cd`,
      component: () => import(`@/views/admin/dev/AC6.vue`)
    },
    {
      name: `AB1`,
      path: `/${adminPath}/dev/AB1`,
      component: () => import(`@/views/admin/dev/AB1.vue`)
    },
    {
      name: `AB2`,
      path: `/${adminPath}/dev/AB2`,
      component: () => import(`@/views/admin/dev/AB2.vue`)
    },
    {
      name: `AB3`,
      path: `/${adminPath}/dev/AB3`,
      component: () => import(`@/views/admin/dev/AB3.vue`)
    },
    {
      name: `AU1`,
      path: `/${adminPath}/dev/AU1`,
      component: () => import(`@/views/admin/dev/AU1.vue`)
    },
    {
      name: `AU2`,
      path: `/${adminPath}/dev/AU2`,
      component: () => import(`@/views/admin/dev/AU2.vue`)
    },
    {
      name: `AU3`,
      path: `/${adminPath}/dev/AU3`,
      component: () => import(`@/views/admin/dev/AU3.vue`)
    },
    {
      name: `AJ1`,
      path: `/${adminPath}/dev/AJ1`,
      component: () => import(`@/views/admin/dev/AJ1.vue`)
    },
    {
      name: `AJ2`,
      path: `/${adminPath}/dev/AJ2`,
      component: () => import(`@/views/admin/dev/AJ2.vue`)
    },
    {
      name: `AJ3`,
      path: `/${adminPath}/dev/AJ3`,
      component: () => import(`@/views/admin/dev/AJ3.vue`)
    },
    {
      name: `AT1`,
      path: `/${adminPath}/dev/AT1`,
      component: () => import(`@/views/admin/dev/AT1.vue`)
    },
    {
      name: `AT2`,
      path: `/${adminPath}/dev/AT2`,
      component: () => import(`@/views/admin/dev/AT2.vue`)
    }
  ]
};
