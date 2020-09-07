<template>
  <span
    @click.stop="emitClickEvent"
    class="px-3 py-2 cursor-pointer rounded hover:bg-gray-200"
    :class="classes"
  >
    <slot />
  </span>
</template>
<script>
export default {
  name: "Button",
  props: {
    classes: String,
  },
  methods: {
    emitClickEvent: function () {
      this.$emit("click-event");
    },
  },
};
</script>