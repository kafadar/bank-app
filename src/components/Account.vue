<template>
  <div class="p-2 w-full lg:w-1/5">
    <div
      @click="initReceipt(account.id)"
      class="relative h-18 lg:h-24 xl:h-32 flex items-center border-l-8 border-purple-400 rounded bg-white shadow-sm hover:shadow-lg cursor-pointer"
      :class="{'border-gray-500' : isEven}"
    >
      <span class="m-6 lg:m-4 text-2xl lg:text-xl text-gray-600">$</span>
      <span class="text-4xl lg:text-2xl w-4/6 truncate">{{account.balance}}</span>
      <div
        class="absolute hover:block p-2 w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 lg:h-full right-0 flex flex-row lg:flex-col justify-around"
      >
        <Button
          @click-event="initDeposit(account.id)"
          class="action-btn lg:p-0 flex justify-center"
        >
          <span class="text-2xl lg:text-sm xl:text-md">📥</span>
        </Button>
        <Button
          @click-event="initTransfer(account.id)"
          class="action-btn lg:p-0 flex justify-center"
        >
          <span class="text-2xl lg:text-sm xl:text-md">📤</span>
        </Button>
        <Button @click-event="initDelete(account.id)" class="action-btn lg:p-0 flex justify-center">
          <span class="text-2xl lg:text-sm xl:text-md">❌</span>
        </Button>
      </div>
    </div>
  </div>
</template>

<script>
import EventBus, {
  DEPOSIT,
  TRANSFER,
  DELETE,
  SHOW_RECEIPT,
} from "@/services/EventBus";

import Button from "@/components/common/Button";

export default {
  components: { Button },
  props: {
    index: Number,
    account: Object,
    add: Boolean,
  },
  computed: {
    isEven() {
      return this.index % 2 === 0;
    },
  },
  methods: {
    initDeposit(id) {
      EventBus.$emit(DEPOSIT, id);
    },
    initTransfer(id) {
      EventBus.$emit(TRANSFER, id);
    },
    initDelete(id) {
      EventBus.$emit(DELETE, id);
    },
    initReceipt(id) {
      EventBus.$emit(SHOW_RECEIPT, id);
    },
  },
};
</script>

<style scoped>
.action-btn {
  opacity: 0.4;
  filter: grayscale(1);
}
.action-btn:hover {
  opacity: 0.8;
  filter: grayscale(0);
}
</style>