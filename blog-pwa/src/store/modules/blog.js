import Http from '@/api/Http';

/* eslint no-shadow: ["error", { "allow": ["state"] }] */
/* eslint no-param-reassign: [2, {"props": false}] */

const state = {
  feed: [],
};

const mutations = {
  setFeed: (state, payload) => {
    state.feed = payload;
  },
};

const actions = {
  getFeed({ commit }) {
    return Http.get('/').then((response) => {
      commit('setFeed', response.data);
    });
  },
};

export default {
  state,
  mutations,
  actions,
};
