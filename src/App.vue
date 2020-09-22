<template>
  <div>
    <div v-if="gotToken" class="shadow-lg">
      <div class="container mx-auto p-3 flex justify-end">
        <Button @click-event="createAccount">
          <span>+ ACCOUNT</span>
        </Button>
      </div>
    </div>
    <div class="container mx-auto py-10">
      <router-view />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

import { CREATE_ACCOUNT } from "@/store/constants";

import Button from "@/components/common/Button";

import { IS_AUTH } from "@/store/constants";
export default {
  components: {
    Button,
  },
  computed: {
    ...mapGetters({
      gotToken: IS_AUTH,
    }),
  },
  methods: {
    ...mapActions({
      createAccount: CREATE_ACCOUNT,
    }),
  },
};
</script>
