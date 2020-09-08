import {
  TOKEN,
  REGISTER,
  LOGOUT,
  SET_TOKEN,
  DELETE_TOKEN,
  IS_AUTH,
} from "./constants";

import { AuthAPI } from "@/services/httpClient";

const state = {
  [TOKEN]: localStorage.getItem(TOKEN) || null,
};

const getters = {
  [IS_AUTH]: function(state) {
    return !!state[TOKEN];
  },
};

const mutations = {
  [SET_TOKEN]: function(state, tkn) {
    state[TOKEN] = tkn;
  },
  [DELETE_TOKEN]: function(state) {
    state[TOKEN] = null;
  },
};

const actions = {
  [REGISTER]: function({ commit }) {
    return new Promise(function(res, rej) {
      AuthAPI.register()
        .then(function({ key }) {
          localStorage.setItem(TOKEN, key);
          commit(SET_TOKEN, key);
          res();
        })
        .catch(function(err) {
          console.log(err);
          rej();
        });
    });
  },
  [LOGOUT]: function({ commit }) {
    localStorage.removeItem(TOKEN);
    commit(DELETE_TOKEN);
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
