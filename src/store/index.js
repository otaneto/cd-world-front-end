import Vue from 'vue';
import Vuex from 'vuex';
import { find } from 'lodash';
import * as firebase from 'firebase';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    loadedCDs: [
      { id: 1, imgs: [{ url: 'https://vuetifyjs.com/static/doc-images/cards/desert.jpg' }], title: 'Kangaroo Valley Safari', description: 'Description', artist: 'Savana', year: 2017, sale_price: 10.6, buy_price: 10.6, genre: 'Folcloric', stock: { quantity: 10, updated_at: '11-01-2018' } },
      { id: 2, imgs: [{ url: 'https://vuetifyjs.com/static/doc-images/cards/desert.jpg' }], title: 'Kangaroo Valley Safari', description: 'Description', artist: 'Savana', year: 2017, sale_price: 10.6, buy_price: 10.6, genre: 'Folcloric', stock: { quantity: 0, updated_at: '11-01-2018' } },
      { id: 3, imgs: [{ url: 'https://vuetifyjs.com/static/doc-images/cards/desert.jpg' }], title: 'Kangaroo Valley Safari', description: 'Description', artist: 'Savana', year: 2017, sale_price: 10.6, buy_price: 10.6, genre: 'Folcloric', stock: { quantity: 10, updated_at: '11-01-2018' } },
    ],
    user: null,
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },
  },
  actions: {
    login({ commit }, payload) {
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then(
          (data) => {
            const user = {
              id: data.uid,
              email: data.email,
            };
            commit('setUser', user);
          },
        )
        .catch(
          error => console.log(error),
        );
    },
    signUserUp({ commit }, payload) {
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then(
          (user) => {
            const newUser = {
              id: user.uid,
              name: '',
            };
            commit('setUser', newUser);
          },
        )
        .catch(
          error => console.log(error),
        );
    },
  },
  getters: {
    loadedCDs(state) {
      return state.loadedCDs;
    },
    loadedCD(state) {
      return cdId => find(state.loadedCDs, ['id', Number(cdId)]);
    },
    user(state) {
      return state.user;
    },
  },
});

export default store;
