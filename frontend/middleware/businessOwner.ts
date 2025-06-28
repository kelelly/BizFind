// middleware/businessOwner.ts
import { defineNuxtRouteMiddleware, navigateTo } from "#app";
import { useAuthStore } from "~/stores/auth";
import { storeToRefs } from "pinia";

export default defineNuxtRouteMiddleware(
  (to): void | ReturnType<typeof navigateTo> => {
    const auth = useAuthStore();
    const { token, ownedBusinesses } = storeToRefs(auth);

    // If not authenticated, redirect to login
    if (!token.value) {
      return navigateTo("/login");
    }

    // Ensure the businessId param is a string
    const businessId = String(to.params.businessId);

    // If the user doesn't own this business, redirect to 403
    if (!ownedBusinesses.value.includes(businessId)) {
      return navigateTo("/403");
    }
  }
);
