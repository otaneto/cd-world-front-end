import Vue from 'vue';
import Router from 'vue-router';

import CDs from '@/components/CDs/CDs';
import CD from '@/components/CDs/CD';
import BuyCD from '@/components/CDs/BuyCD';
import NewCD from '@/components/CDs/NewCD';
import PurchaseConfirmation from '@/components/CDs/PurchaseConfirmation';
import Login from '@/components/User/Login';
import SignUp from '@/components/User/SignUp';
import Admin from '@/components/Admin/Admin';
import AuthGuard from './auth-guard';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'CDs',
      component: CDs,
      beforeEnter: AuthGuard,
    },
    {
      path: '/cd/:id',
      name: 'CD Details',
      props: true,
      component: CD,
    },
    {
      path: '/cd/:id/buy',
      name: 'Buy CD',
      props: true,
      component: BuyCD,
    },
    {
      path: '/cd/:id/confirm_purchase/:sale_id',
      name: 'Confirm Purchase',
      props: true,
      component: PurchaseConfirmation,
    },
    {
      path: '/admin/cds/new',
      name: 'New CD',
      component: NewCD,
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/sign-up',
      name: 'SignUp',
      component: SignUp,
    },
    {
      path: '/admin',
      name: 'Admin',
      component: Admin,
    },
  ],
});
