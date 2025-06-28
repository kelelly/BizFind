// middleware/guest.ts
import { defineNuxtRouteMiddleware, navigateTo } from "#app";
import { useAuthStore } from "~/stores/auth";
import { storeToRefs } from "pinia";

export default defineNuxtRouteMiddleware((to) => {
  const auth = useAuthStore();
  const { isLoggedIn } = storeToRefs(auth);

  // If this page is marked guest-only and user is already logged in → redirect
  if (to.meta.guest && isLoggedIn.value) {
    return navigateTo("/dashboard");
  }
});
