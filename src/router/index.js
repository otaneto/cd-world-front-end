import Vue from 'vue';
import Router from 'vue-router';

import CDs from '@/components/CDs/CDs';
import CD from '@/components/CDs/CD';
import Login from '@/components/Login/Login';
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
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/admin',
      name: 'Admin',
      component: Admin,
    },
  ],
});
