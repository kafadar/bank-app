import Vue from "vue";
import Vuex from "vuex";

import auth from "./auth";
import account from "./account";
import actions from "./actions";
import pagination from "./pagination";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    account,
    actions,
    pagination,
  },
});
