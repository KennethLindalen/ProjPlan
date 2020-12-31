import { Authority } from '@/shared/security/authority';

const dashboard = () => import('@/core/dashboard/dashboard.vue');

export default [
  {
    path: '/dashboard',
    name: 'dashboard',
    component: dashboard,
    meta: { authorities: [Authority.USER] },
  },
];
