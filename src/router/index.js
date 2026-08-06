import { createRouter, createWebHashHistory } from "vue-router";
import Accueil from "../views/Accueil.vue";
import Wirds from "../views/Wirds.vue";
import Params from "../views/Params.vue";

const routes = [
  { path: "/", component: Accueil },
  { path: "/wirds", component: Wirds },
  { path: "/params", component: Params },
];

export default createRouter({
  history: createWebHashHistory(),
  routes,
});
