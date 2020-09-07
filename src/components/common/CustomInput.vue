<template>
  <div class="mb-4 px-4">
    <label class="block text-sm text-left font-semibold mb-2">{{label}}</label>
    <input
      class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      :type="type"
      :value="data"
      @input="$emit('update:data', $event.target.value)"
      :placeholder="placeholder"
    />
  </div>
</template>

<script>
export default {
  props: {
    label: String,
    data: String,
    type: {
      type: String,
      deafault: "text",
    },
    placeholder: {
      type: String,
      default: "type text",
    },
  },
};
</script>