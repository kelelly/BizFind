// middleware/admin.ts
import { defineNuxtRouteMiddleware, navigateTo } from "#app";
import { useAuthStore } from "~/stores/auth";
import { storeToRefs } from "pinia";

export default defineNuxtRouteMiddleware((to) => {
  const auth = useAuthStore();
  const { isLoggedIn, role } = storeToRefs(auth);

  // Only guard pages marked requiresAdmin
  if (to.meta.requiresAdmin) {
    // Not logged in → login, or logged in but not admin → 403
    if (!isLoggedIn.value) {
      return navigateTo("/login");
    }
    if (role.value !== "admin") {
      return navigateTo("/403");
    }
  }
});
