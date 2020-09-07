<template>
  <div>
    <div class="mt-4 mb-16 lg:my-4 bg-gray-200 rounded">
      <AccountList :accounts="accountsByPage" />
    </div>
    <Pagination
      @click-event="paginationClickHandler"
      :current-page="currentPage"
      :total-pages="totalPages"
    />

    <modal v-show="depositModalVsbl" @confirm="depositAccount" @cancel="resetState">
      <span slot="header">Deposit</span>
      <custom-input :data.sync="amount" label="Amount" type="number" placeholder="Amount" />
    </modal>

    <modal v-show="transferModalVsbl" @confirm="transferAccount" @cancel="resetState">
      <span slot="header">Transfer</span>
      <custom-input :data.sync="receiver" label="Receiver" placeholder="Receiver" />
      <custom-input :data.sync="amount" label="Amount" type="number" placeholder="Amount" />
    </modal>

    <modal v-show="confirmModalVsbl" @confirm="deleteAccount" @cancel="resetState">
      <span slot="header">Delete?</span>
    </modal>

    <modal v-show="receiptModalVsbl" @close="receiptModalVsbl = false" classes="w-5/6 lg:w-1/3">
      <span slot="header">Receipt</span>
      <ul v-if="receipt.length > 0" class="text-left p-2">
        <li
          :key="rcpt.id"
          v-for="(rcpt) in receipt"
          :class="rcpt.merchant ? 'border-red-400' : 'border-green-400'"
          class="bg-gray-100 border-l-4 p-2 w-5/6 mx-auto rounded mb-2"
        >
          <span v-if="rcpt.merchant">➖</span>
          <span v-else>➕</span>
          <span class="ml-3 text-gray-600 font-semibold">$</span>
          <span class="p-2 text-lg font-bold w-1/5 truncate">{{rcpt.amount}}</span>
          <span v-if="rcpt.merchant" class="p-2 text-xs text-gray-700">{{rcpt.merchant}}</span>
          <span class="p-2 float-right text-gray-600 lg:hidden xl:block">{{formatDate(rcpt.date)}}</span>
        </li>
      </ul>
      <span v-else>Nothing show</span>
      <Button
        slot="footer"
        @click-event="receiptModalVsbl = false"
        classes="ml-2 px-4 text-white bg-blue-400 hover:bg-blue-500"
      >OK</Button>
    </modal>
  </div>
</template>
<script>
import moment from "moment";
import { mapGetters, mapActions } from "vuex";

import Button from "@/components/common/Button";

import EventBus, {
  DEPOSIT,
  TRANSFER,
  DELETE,
  SHOW_RECEIPT,
} from "@/services/EventBus";

import AccountList from "@/components/AccountList";
import Pagination from "@/components/Pagination";
import Modal from "@/components/common/Modal";
import CustomInput from "@/components/common/CustomInput";

import {
  ACCOUNTS_BY_PAGE,
  CURRENT_PAGE,
  PAGE_COUNT,
  SET_CURRENT_PAGE,
  LOAD_ACCOUNTS,
  LOAD_ACTIONS,
  LOAD_TRANSACTIONS,
  ACCOUNT_RECEIPT,
  DEPOSIT_ACTION,
  TRANS_ACTION,
  DELETE_ACCOUNT,
} from "@/store/constants";

export default {
  components: {
    AccountList,
    Pagination,
    Modal,
    CustomInput,
    Button,
  },
  data() {
    return {
      account: null,
      amount: null,
      receiver: null,
      depositModalVsbl: false,
      confirmModalVsbl: false,
      transferModalVsbl: false,
      receiptModalVsbl: false,
      receipt: [],
    };
  },
  computed: {
    ...mapGetters({
      accountsByPage: ACCOUNTS_BY_PAGE,
      totalPages: PAGE_COUNT,
      currentPage: CURRENT_PAGE,
      getAccountReceipt: ACCOUNT_RECEIPT,
    }),
  },
  methods: {
    formatDate(raw) {
      return raw ? moment(raw).format("DD-MM-YYYY hh:mm") : "- - -";
    },
    ...mapActions({
      dispatchDeposit: DEPOSIT_ACTION,
      dispatchTransfer: TRANS_ACTION,
      dispatchDelete: DELETE_ACCOUNT,
    }),
    paginationClickHandler: function (number) {
      this.$store.commit(SET_CURRENT_PAGE, number);
    },
    depositAccount() {
      this.dispatchDeposit({ id: this.account, amount: this.amount });
      this.resetState();
    },
    transferAccount() {
      this.dispatchTransfer({
        id: this.account,
        amount: this.amount,
        receiver: this.receiver,
      });
      this.resetState();
    },
    deleteAccount() {
      this.dispatchDelete({ id: this.account });
      this.resetState();
    },
    resetState() {
      this.account = null;
      this.amount = null;
      this.receiver = null;

      this.depositModalVsbl = false;
      this.transferModalVsbl = false;
      this.confirmModalVsbl = false;
    },
  },
  mounted() {
    this.$store.dispatch(LOAD_ACCOUNTS);
    this.$store.dispatch(LOAD_ACTIONS);
    this.$store.dispatch(LOAD_TRANSACTIONS);

    EventBus.$on(TRANSFER, (id) => {
      this.transferModalVsbl = true;
      this.account = id;
    });

    EventBus.$on(DEPOSIT, (id) => {
      this.depositModalVsbl = true;
      this.account = id;
    });

    EventBus.$on(DELETE, (id) => {
      this.confirmModalVsbl = true;
      this.account = id;
    });
    EventBus.$on(SHOW_RECEIPT, (id) => {
      this.receiptModalVsbl = true;

      this.receipt = this.getAccountReceipt(id);
    });
  },
  beforeDestroy() {
    EventBus.$off(TRANSFER);
    EventBus.$off(DEPOSIT);
    EventBus.$off(DELETE);
    EventBus.$off(SHOW_RECEIPT);
  },
};
</script>