// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Vuetify from 'vuetify';
import * as firebase from 'firebase';

import 'vuetify/dist/vuetify.css';
import 'font-awesome/css/font-awesome.css';
import App from './App';
import router from './router';
import store from './store';

Vue.use(Vuetify);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
  created() {
    firebase.initializeApp({
      apiKey: 'AIzaSyCpPWC0lzbI_29QY6lXT7svqDgwlh7VOWE',
      authDomain: 'vue-cd-world.firebaseapp.com',
      databaseURL: 'https://vue-cd-world.firebaseio.com',
      projectId: 'vue-cd-world',
      storageBucket: 'vue-cd-world.appspot.com',
      messagingSenderId: '116344488190',
    });
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        store.dispatch('autoLogin', user);
      }
    });
  },
});
