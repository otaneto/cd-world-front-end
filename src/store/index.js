import Vue from 'vue';
import Vuex from 'vuex';
import { find, assign, keys, map, omit } from 'lodash';
import * as firebase from 'firebase';
import router from '../router';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    loadedCDs: [],
    cdsFound: [],
    sales: [],
    user: null,
    isFetching: false,
  },
  mutations: {
    setIsFetching(state, payload) {
      assign(state, { isFetching: payload });
    },
    // User
    setUser(state, payload) {
      assign(state, { user: payload });
    },
    // CDs
    setCDs(state, payload) {
      assign(state, { loadedCDs: payload, cdsFound: payload });
    },
    setNewCD(state, payload) {
      const { loadedCDs, cdsFound } = state;
      loadedCDs.push(payload);
      cdsFound.push(payload);
      assign(state, { loadedCDs, cdsFound });
    },
    searchCDs(state, payload) {
      assign(state, { cdsFound: payload });
    },
    decreaseCDStock(state, payload) {
      const cds = map(state.loadedCDs, (cd) => {
        if (cd.id === payload.id) {
          assign(cd, payload);
        }
      });
      assign(state, { loadedCDs: cds, cdsFound: cds });
    },
    // Purchase/Sales
    setNewSale(state, payload) {
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
    newCD({ commit }, payload) {
      firebase.database().ref('cds').push(payload)
        .then(
          (data) => {
            commit('setNewCD', { id: data.key, ...payload });
          },
        )
        .catch(
          error => console.log(error),
        );
    },
    getCDs({ commit }) {
      commit('setIsFetching', true);
      firebase.database().ref('cds').once('value')
        .then(
          (data) => {
            const obj = data.val();
            const cds = map(keys(obj), key => (
              { ...obj[key], id: key }
            ));
            commit('setIsFetching', false);
            commit('setCDs', cds);
          },
        )
        .catch(
          (error) => {
            console.log(error);
            commit('setIsFetching', false);
          },
        );
    },
    findCDs({ commit }, payload) {
      commit('searchCDs', payload);
    },

    // Purchase/sales
    newPurchase({ commit }, payload) {
      firebase.database().ref('sales').push(payload)
        .then(
          ({ key }) => {
            const newSale = { id: key, ...payload };
            commit('setNewSale', newSale);
            router.push(`/cd/${newSale.cd.id}/confirm_purchase/${key}`);
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
    decreaseCDStock({ commit }, payload) {
      const newStockQuantity = payload.cd.stock.quantity - payload.cd.amount;
      const newStockDate = new Date().toISOString();
      const updatedCD = {
        ...omit(payload.cd, ['amount']),
        stock: { quantity: newStockQuantity, updated_at: newStockDate },
      };
      firebase.database().ref('cds').child(payload.cd.id).update(updatedCD)
        .then(
          () => {
            commit('decreaseCDStock', updatedCD);
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
    sale(state) {
      return saleId => find(state.sales, ['id', saleId]);
    },
    isFetching(state) {
      return state.isFetching;
    },
  },
});

export default store;
