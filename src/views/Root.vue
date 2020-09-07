<template>
  <h1>ROOT</h1>
</template>

<script>
import { mapGetters } from "vuex";

import { IS_AUTH, REGISTER } from "@/store/constants";

export default {
  name: "Root",
  computed: {
    ...mapGetters({
      gotToken: IS_AUTH,
    }),
  },
  mounted() {
    if (this.gotToken) {
      this.$router.push("/profile");
    } else {
      this.$store.dispatch(REGISTER).then(() => {
        this.$router.push("/profile");
      });
    }
  },
};
</script>
