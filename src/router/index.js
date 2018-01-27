import Vue from 'vue';
import Router from 'vue-router';

import CDs from '@/components/CDs/CDs';
import CD from '@/components/CDs/CD';
import BuyCD from '@/components/CDs/BuyCD';
import Login from '@/components/User/Login';
import SignUp from '@/components/User/SignUp';
import Admin from '@/components/Admin/Admin';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'CDs',
      component: CDs,
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
