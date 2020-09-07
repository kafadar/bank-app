import {
  ACCOUNTS,
  SET_ACCOUNTS,
  SET_ACTIONS,
  SET_TRANSACTIONS,
  LOAD_ACTIONS,
  LOAD_TRANSACTIONS,
  DELETE_ACCOUNT_TRANS_ACTIONS,
  TRANS_ACTION,
  DEPOSIT_ACTION,
  ACCOUNT_RECEIPT,
} from "./constants";

import { AccountAPI } from "@/services/httpClient";

const state = {
  actions: [],
  transactions: [],
};

const getters = {
  [ACCOUNT_RECEIPT]: function(state) {
    return function(account) {
      return [
        ...state.actions.filter((a) => a.account == account),
        ...state.transactions.filter((a) => a.account == account),
      ].sort(function(a, b) {
        return new Date(b.date) - new Date(a.date);
      });
    };
  },
};

const mutations = {
  [SET_ACTIONS]: function(state, actions) {
    state.actions = actions;
  },
  [SET_TRANSACTIONS]: function(state, tranactions) {
    state.transactions = tranactions;
  },
  [DELETE_ACCOUNT_TRANS_ACTIONS]: function(state, accountId) {
    state.actions = state.actions.filter((a) => a.account != accountId);
    state.transactions = state.transactions.filter(
      (a) => a.account != accountId
    );
  },
};

const actions = {
  [DEPOSIT_ACTION]: function({ state, rootGetters, commit }, { id, amount }) {
    AccountAPI.postAction(id, amount).then(function(action) {
      const acc = {
        ...rootGetters[ACCOUNTS].find((a) => a.id == action.account),
      };
      acc.actions = [...acc.actions, id];
      acc.balance = (acc.balance - -amount).toFixed(2);

      commit(SET_ACTIONS, [...state.actions, action]);
      commit(
        SET_ACCOUNTS,
        [...rootGetters[ACCOUNTS].filter((a) => a.id !== action.account), acc],
        { root: true }
      );
    });
  },
  [TRANS_ACTION]: function({ rootGetters, commit }, { id, amount, receiver }) {
    AccountAPI.postTransaction(id, amount, receiver).then(function(
      transaction
    ) {
      console.log(transaction);
      const acc = {
        ...rootGetters[ACCOUNTS].find((a) => a.id == transaction.account),
      };
      acc.balance = (acc.balance - amount).toFixed(2);

      commit(SET_TRANSACTIONS, [...state.transactions, transaction]);
      commit(
        SET_ACCOUNTS,
        [
          ...rootGetters[ACCOUNTS].filter((a) => a.id !== transaction.account),
          acc,
        ],
        { root: true }
      );
    });
  },
  [LOAD_ACTIONS]: function({ commit }) {
    AccountAPI.getActions().then(function(data) {
      commit(SET_ACTIONS, data);
    });
  },
  [LOAD_TRANSACTIONS]: function({ commit }) {
    AccountAPI.getTransactions().then(function(data) {
      commit(SET_TRANSACTIONS, data);
    });
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
