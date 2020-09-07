<template>
  <transition name="modal-fade">
    <div
      @click="close"
      class="fixed top-0 bottom-0 left-0 right-0 flex justify-center items-center bg-gray-800 bg-opacity-25"
    >
      <div class="flex flex-col rounded p-4 bg-white shadow-xl" :class="classes" role="dialog">
        <header class="font-semibold text-xl text-center mb-2">
          <slot name="header" />
        </header>
        <section class="text-center mb-3">
          <slot />
        </section>
        <footer class="flex justify-end lg:justify-around">
          <slot name="footer">
            <Button @click-event="emitCancel">{{cancelText}}</Button>
            <Button
              @click-event="emitConfirm"
              classes="ml-2 px-4 text-white bg-blue-400 hover:bg-blue-500"
            >{{confirmText}}</Button>
          </slot>
        </footer>
      </div>
    </div>
  </transition>
</template>

<script>
import Button from "@/components/common/Button";

export default {
  name: "modal",
  props: {
    classes: {
      type: String,
      default: "w-5/6 md:w-1/2 lg:w-1/4",
    },
    confirmText: {
      type: String,
      default: "Confirm",
    },
    cancelText: {
      type: String,
      default: "Cancel",
    },
  },
  components: {
    Button,
  },
  methods: {
    emitConfirm() {
      this.$emit("confirm");
    },
    emitCancel() {
      this.$emit("cancel");
    },
    close() {
      this.$emit("close");
    },
  },
};
</script>

<style scoped>
.modal-fade-enter,
.modal-fade-leave-active {
  opacity: 0;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.5s ease;
}
</style>
