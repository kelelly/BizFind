// middleware/auth.ts
import { defineNuxtRouteMiddleware, navigateTo } from "#app";
import { useAuthStore } from "~/stores/auth";
import { storeToRefs } from "pinia";

export default defineNuxtRouteMiddleware((to) => {
  const auth = useAuthStore();
  const { isLoggedIn } = storeToRefs(auth);

  // If this page requires login and user is not logged in → redirect
  if (to.meta.requiresAuth && !isLoggedIn.value) {
    return navigateTo("/login");
  }
});
