import Vue from 'vue';
import Vuex from 'vuex';
import { find } from 'lodash';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    loadedCDs: [
      { id: 1, imgs: [{ url: 'https://vuetifyjs.com/static/doc-images/cards/desert.jpg' }], title: 'Kangaroo Valley Safari', description: 'Description', artist: 'Savana', year: 2017, sale_price: 10.6, buy_price: 10.6, genre: 'Folcloric', stock: { quantity: 10, updated_at: '11-01-2018' } },
      { id: 2, imgs: [{ url: 'https://vuetifyjs.com/static/doc-images/cards/desert.jpg' }], title: 'Kangaroo Valley Safari', description: 'Description', artist: 'Savana', year: 2017, sale_price: 10.6, buy_price: 10.6, genre: 'Folcloric', stock: { quantity: 0, updated_at: '11-01-2018' } },
      { id: 3, imgs: [{ url: 'https://vuetifyjs.com/static/doc-images/cards/desert.jpg' }], title: 'Kangaroo Valley Safari', description: 'Description', artist: 'Savana', year: 2017, sale_price: 10.6, buy_price: 10.6, genre: 'Folcloric', stock: { quantity: 10, updated_at: '11-01-2018' } },
    ],
    user: {
      id: '3euy4872',
      name: 'Jhon Doe',
    },
  },
  mutations: {},
  actions: {},
  getters: {
    loadedCDs(state) {
      return state.loadedCDs;
    },
    loadedCD(state) {
      return cdId => find(state.loadedCDs, ['id', Number(cdId)]);
    },
  },
});

export default store;
