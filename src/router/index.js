import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/login",
      name: "login",
      component: Login,
      meta: {
        title: "Login",
      }
    },
    {
      path: "/register",
      name: "register",
      component: Register,
      meta: {
        title: "Register"
      }
    }
  ]
});

export default router;