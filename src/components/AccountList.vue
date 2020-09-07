<template>
  <div class="h-auto p-2 flex flex-col lg:flex-row flex-wrap rounded">
    <Account :key="acc.id" v-for="(acc, index) in accounts" :index="index" :account="acc" />
    <div v-if="!pageFull" class="p-2 w-full lg:w-1/5">
      <div
        @click="createAccount"
        class="h-16 lg:h-24 xl:h-32 flex flex-row justify-center items-center border-dashed border-2 border-gray-400 hover:border-gray-500 rounded cursor-pointer"
      >
        <span class="text-2xl text-gray-600">+</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

import { CREATE_ACCOUNT } from "@/store/constants";

import Account from "./Account";
export default {
  components: {
    Account,
  },
  computed: {
    pageFull: function () {
      return this.accounts.length >= 10;
    },
  },
  methods: {
    ...mapActions({
      createAccount: CREATE_ACCOUNT,
    }),
  },
  props: {
    accounts: Array,
  },
};
</script>