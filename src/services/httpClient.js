import axios from "axios";
import faker from "./faker";

import { TOKEN } from "@/store/constants";

const httpClient = axios.create({
  baseURL: process.env.VUE_APP_API,
});

export const AuthAPI = {
  register: function() {
    return new Promise(function(res, rej) {
      let username = faker.generateUsername(),
        password = faker.generatePassword();

      let user = {
        username,
        email: `${username}@mail.com`,
        password1: password,
        password2: password,
      };

      httpClient
        .post("rest-auth/registration/", { ...user })
        .then(function({ data }) {
          res(data);
        })
        .catch(function(err) {
          rej(err);
        });
    });
  },
};

export const AccountAPI = {
  getAccounts: function() {
    return new Promise(function(res, rej) {
      httpClient
        .get("api/bank/account/", {
          headers: {
            Authorization: `Token ${localStorage.getItem(TOKEN)}`,
          },
        })
        .then(function({ data }) {
          res(data);
        })
        .catch(function(err) {
          rej(err);
        });
    });
  },
  postAccount: function() {
    return new Promise(function(res, rej) {
      httpClient
        .post(
          "api/bank/account/",
          {},
          {
            headers: {
              Authorization: `Token ${localStorage.getItem(TOKEN)}`,
            },
          }
        )
        .then(function({ data }) {
          res(data);
        })
        .catch(function(err) {
          rej(err);
        });
    });
  },
  deleteAccount: function(id) {
    return new Promise(function(res, rej) {
      httpClient
        .delete(`api/bank/account/${id}/`, {
          headers: {
            Authorization: `Token ${localStorage.getItem(TOKEN)}`,
          },
        })
        .then(function(response) {
          res(response);
        })
        .catch(function(err) {
          rej(err);
        });
    });
  },
  getActions: function() {
    return new Promise(function(res, rej) {
      httpClient
        .get("api/bank/action/", {
          headers: {
            Authorization: `Token ${localStorage.getItem(TOKEN)}`,
          },
        })
        .then(function({ data }) {
          res(data);
        })
        .catch(function(err) {
          rej(err);
        });
    });
  },
  getTransactions: function() {
    return new Promise(function(res, rej) {
      httpClient
        .get("api/bank/transaction/", {
          headers: {
            Authorization: `Token ${localStorage.getItem(TOKEN)}`,
          },
        })
        .then(function({ data }) {
          res(data);
        })
        .catch(function(err) {
          rej(err);
        });
    });
  },
  postAction: function(id, amount) {
    return new Promise(function(res, rej) {
      httpClient
        .post(
          "api/bank/action/",
          {
            account: id,
            amount,
          },
          {
            headers: {
              Authorization: `Token ${localStorage.getItem(TOKEN)}`,
            },
          }
        )
        .then(function({ data }) {
          res(data);
        })
        .catch(function(err) {
          rej(err);
        });
    });
  },
  postTransaction: function(id, amount, receiver) {
    return new Promise(function(res, rej) {
      httpClient
        .post(
          "api/bank/transaction/",
          {
            account: id,
            merchant: receiver,
            amount,
          },
          {
            headers: {
              Authorization: `Token ${localStorage.getItem(TOKEN)}`,
            },
          }
        )
        .then(function({ data }) {
          res(data);
        })
        .catch(function(err) {
          rej(err);
        });
    });
  },
};
