import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    tag: '',
  },
  mutations: {
    CHANGE_TAG(state, payload) {
      state.tag = payload;
    },
  },
  actions: {},
});
