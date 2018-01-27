import Vue from 'vue';
import Vuex from 'vuex';
import { find, assign } from 'lodash';
import * as firebase from 'firebase';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    loadedCDs: [
      { id: 1, imgs: [{ url: 'https://goo.gl/kLGLXE' }], title: 'Empires', description: 'The 4th CD of Hillsongs carreer', artist: 'Hillsong United', year: 2015, sale_price: 10.6, buy_price: 19.99, genre: 'Gospel', stock: { quantity: 10, updated_at: '26-01-2018' } },
      { id: 2, imgs: [{ url: 'https://vuetifyjs.com/static/doc-images/cards/desert.jpg' }], title: 'Kangaroo Valley Safari', description: 'Description', artist: 'Molejo', year: 2017, sale_price: 10.6, buy_price: 10.6, genre: 'Folcloric', stock: { quantity: 0, updated_at: '11-01-2018' } },
      { id: 3, imgs: [{ url: 'https://vuetifyjs.com/static/doc-images/cards/desert.jpg' }], title: 'Kangaroo Valley Safari', description: 'Description', artist: 'Savana', year: 2017, sale_price: 10.6, buy_price: 10.6, genre: 'Folcloric', stock: { quantity: 10, updated_at: '11-01-2018' } },
    ],
    cdsFound: [
      { id: 1, imgs: [{ url: 'https://goo.gl/kLGLXE' }], title: 'Empires', description: 'The 4th CD of Hillsongs carreer', artist: 'Hillsong United', year: 2015, sale_price: 10.6, buy_price: 19.99, genre: 'Gospel', stock: { quantity: 10, updated_at: '26-01-2018' } },
      { id: 2, imgs: [{ url: 'https://vuetifyjs.com/static/doc-images/cards/desert.jpg' }], title: 'Kangaroo Valley Safari', description: 'Description', artist: 'Molejo', year: 2017, sale_price: 10.6, buy_price: 10.6, genre: 'Folcloric', stock: { quantity: 0, updated_at: '11-01-2018' } },
      { id: 3, imgs: [{ url: 'https://vuetifyjs.com/static/doc-images/cards/desert.jpg' }], title: 'Kangaroo Valley Safari', description: 'Description', artist: 'Savana', year: 2017, sale_price: 10.6, buy_price: 10.6, genre: 'Folcloric', stock: { quantity: 10, updated_at: '11-01-2018' } },
    ],
    sales: [],
    user: null,
  },
  mutations: {
    setUser(state, payload) {
      assign(state, { user: payload });
    },
    searchCDs(state, payload) {
      assign(state, { cdsFound: payload });
    },
    setNewPurchase(state, payload) {
      const sales = state.sales;
      sales.push(payload);
      assign(state, { sales });
      console.log(state.sales);
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
    getCDs({ commit }, payload) {
      commit('searchCDs', payload);
    },
    newPurchase({ commit }, payload) {
      commit('setNewPurchase', payload);
    },
  },
  getters: {
    loadedCDs(state) {
      return state.loadedCDs;
    },
    cdsFound(state) {
      return state.cdsFound;
    },
    loadedCD(state) {
      return cdId => find(state.loadedCDs, ['id', Number(cdId)]);
    },
    user(state) {
      return state.user;
    },
    sales(state) {
      return state.sales;
    },
  },
});

export default store;
