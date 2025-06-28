// plugins/authFetch.ts
import { defineNuxtPlugin, NuxtApp } from "#app";
import { useAuthStore } from "~/stores/auth";
import type { FetchOptions } from "0";

export default defineNuxtPlugin((nuxtApp: NuxtApp) => {
  const auth = useAuthStore();

  // Provide a wrapper around $fetch that injects the Authorization header
  nuxtApp.provide(
    "authFetch",
    async (url: string, options: FetchOptions = {}) => {
      const opts: FetchOptions = { ...options };

      if (auth.token) {
        opts.headers = {
          ...(opts.headers as Record<string, string>),
          Authorization: `Bearer ${auth.token}`,
        };
      }

      // Use the built-in $fetch via nuxtApp
      return await nuxtApp.$fetch(url, opts);
    }
  );
});
