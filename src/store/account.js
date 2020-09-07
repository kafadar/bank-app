import {
  ACCOUNTS,
  ACCOUNT_NUMBER,
  ACCOUNTS_BY_PAGE,
  LOAD_ACCOUNTS,
  CREATE_ACCOUNT,
  DELETE_ACCOUNT,
  DELETE_ACCOUNT_TRANS_ACTIONS,
  SET_ACCOUNTS,
  PAGE_COUNT,
  CURRENT_PAGE,
  SET_CURRENT_PAGE,
  ITEMS_PER_PAGE,
} from "./constants";

import { AccountAPI } from "@/services/httpClient";

const state = {
  accounts: [],
};

const getters = {
  [ACCOUNTS]: function(state) {
    return state.accounts.sort((a, b) => a.id - b.id);
  },
  [ACCOUNT_NUMBER]: function(state) {
    return state.accounts.length;
  },
  [ACCOUNTS_BY_PAGE]: function(state, rootGetters) {
    let start =
        0 < rootGetters[CURRENT_PAGE]
          ? rootGetters[CURRENT_PAGE] * rootGetters[ITEMS_PER_PAGE]
          : 0,
      end = start + rootGetters[ITEMS_PER_PAGE];
    return state.accounts.sort((a, b) => a.id - b.id).slice(start, end);
  },
};

const mutations = {
  [SET_ACCOUNTS]: function(state, accs) {
    state.accounts = accs;
  },
};

const actions = {
  [LOAD_ACCOUNTS]: function({ commit }) {
    AccountAPI.getAccounts().then(function(accs) {
      commit(SET_ACCOUNTS, accs);
    });
  },
  [CREATE_ACCOUNT]: function({ commit, rootGetters }) {
    AccountAPI.postAccount().then(function(acc) {
      commit(SET_ACCOUNTS, [...state.accounts, acc]);
      if (rootGetters[CURRENT_PAGE] < rootGetters[PAGE_COUNT])
        commit(SET_CURRENT_PAGE, rootGetters[PAGE_COUNT] - 1, { root: true });
    });
  },
  [DELETE_ACCOUNT]: function({ state, commit }, { id }) {
    AccountAPI.deleteAccount(id).then(function() {
      commit(DELETE_ACCOUNT_TRANS_ACTIONS, id, { root: true });
      commit(SET_ACCOUNTS, [...state.accounts.filter((a) => a.id !== id)]);
    });
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
