<template>
  <div class="w-full fixed lg:sticky bottom-0 left-0 bg-gray-200">
    <ul class="w-1/3 mx-auto py-6 flex flex-row justify-between">
      <li
        :key="page"
        v-for="page in pageList"
        @click="emitClick(page)"
        :class="{ 'bg-gray-400': page == currentPage }"
        class="py-2 px-4 bg-gray-200 hover:bg-gray-300 cursor-pointer rounded"
      >{{page + 1}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    totalPages: {
      type: Number,
      default: 1,
    },
    currentPage: {
      type: Number,
      required: true,
    },
  },
  computed: {
    pageList: function () {
      return [...new Array(this.totalPages).keys()];
    },
  },
  methods: {
    emitClick: function (page) {
      this.$emit("click-event", page);
    },
  },
};
</script>

