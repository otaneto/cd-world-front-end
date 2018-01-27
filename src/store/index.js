import Vue from 'vue';
import Vuex from 'vuex';
import { find, assign, keys, map } from 'lodash';
import * as firebase from 'firebase';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    loadedCDs: [],
    cdsFound: [],
    sales: [],
    user: null,
  },
  mutations: {
    // User
    setUser(state, payload) {
      assign(state, { user: payload });
    },
    // CDs
    setCDs(state, payload) {
      assign(state, { loadedCDs: payload, cdsFound: payload });
      console.log(state.loadedCDs, state.cdsFound);
    },
    searchCDs(state, payload) {
      assign(state, { cdsFound: payload });
    },
    // Purchase/Sales
    setNewPurchase(state, payload) {
      const sales = state.sales;
      sales.push(payload);
      assign(state, { sales });
    },
    setSales(state, payload) {
      assign(state, { sales: payload });
    },
  },
  actions: {
    // Authentication
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

    // CDS
    newCD(payload) {
      firebase.database().ref('cds').push(payload)
        .then(
          () => {
          },
        )
        .catch(
          error => console.log(error),
        );
    },
    getCDs({ commit }) {
      firebase.database().ref('cds').once('value')
        .then(
          (data) => {
            const obj = data.val();
            const cds = map(keys(obj), key => (
              { ...obj[key], id: key }
            ));
            commit('setCDs', cds);
          },
        )
        .catch(
          error => console.log(error),
        );
    },
    findCDs({ commit }, payload) {
      commit('searchCDs', payload);
    },

    // Purchase/sales
    newPurchase(payload) {
      firebase.database().ref('sales').push(payload)
        .then(
          () => {
            // commit('setNewPurchase', key);
          },
        )
        .catch(
          error => console.log(error),
        );
    },
    getSales({ commit }) {
      firebase.database().ref('sales').once('value')
        .then(
          (data) => {
            const obj = data.val();
            const sales = map(keys(obj), key => obj[key]);
            commit('setSales', sales);
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
    cdsFound(state) {
      return state.cdsFound;
    },
    loadedCD(state) {
      return cdId => find(state.loadedCDs, ['id', cdId]);
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
