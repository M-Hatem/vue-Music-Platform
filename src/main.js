import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import VeeValidationPlugin from "./includes/validation";
import { auth } from "./includes/firebase";
import progressBar from "./includes/progress-bar";

import "./assets/base.css";
import "./assets/main.css";
import "nprogress/nprogress.css";

progressBar(router);

let app;

auth.onAuthStateChanged(() => {
  if (!app) {
    app = createApp(App);
    app.use(createPinia());
    app.use(router);
    app.use(VeeValidationPlugin);

    app.mount("#app");
  }
});
