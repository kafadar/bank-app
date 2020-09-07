import {
  CURRENT_PAGE,
  ITEMS_PER_PAGE,
  PAGE_COUNT,
  ACCOUNT_NUMBER,
  SET_CURRENT_PAGE,
} from "./constants";

const state = {
  currentPage: 0,
  itemsPerPage: 10,
};

const getters = {
  [CURRENT_PAGE]: function(state) {
    return state.currentPage;
  },
  [ITEMS_PER_PAGE]: function(state) {
    return state.itemsPerPage;
  },
  [PAGE_COUNT]: function(state, rootGetters) {
    return Math.ceil(rootGetters[ACCOUNT_NUMBER] / state.itemsPerPage);
  },
};

const mutations = {
  [SET_CURRENT_PAGE]: function(state, number) {
    state.currentPage = number;
  },
};

const actions = {};

export default {
  state,
  getters,
  mutations,
  actions,
};
