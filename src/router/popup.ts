import Layout from '@/layouts/admin/LayoutPopup.vue';
const adminPath = 'lcksl-fr/lypts/sol01';

export default {
  path: `/${adminPath}`,
  component: Layout,
  children: [
    {
      name: `AJ4_POPUP`,
      path: `/${adminPath}/dev/AJ4`,
      component: () => import(`@/views/admin/dev/AJ4.vue`)
    },
  ]
};
