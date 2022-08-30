<template>
  <app-header />

  <RouterView> </RouterView>

  <app-player />

  <app-auth />
</template>

<script>
import AppHeader from "@/components/AppHeader.vue";
import AppAuth from "@/components/AppAuth.vue";
import AppPlayer from "@/components/Player.vue";

import { auth } from "./includes/firebase";
import useUserStore from "@/stores/user";
import { mapWritableState } from "pinia";

export default {
  name: "App",
  components: {
    AppHeader,
    AppAuth,
    AppPlayer,
  },
  computed: {
    ...mapWritableState(useUserStore, ["userLoggedIn"]),
  },
  created() {
    if (auth.currentUser) {
      this.userLoggedIn = true;
    }
  },
};
</script>
