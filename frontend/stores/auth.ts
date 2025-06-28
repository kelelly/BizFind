// stores/auth.ts
import { defineStore } from "pinia";
import { useNuxtApp } from "#app";

export interface Credentials {
  email: string;
  password: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  // add other user fields here as needed
}

export interface AuthState {
  token: string | null;
  user: User | null;
}

export const useAuthStore = defineStore<
  "auth",
  AuthState,
  {},
  {
    login(credentials: Credentials): Promise<void>;
    logout(): void;
  }
>("auth", {
  state: (): AuthState => ({
    token: null,
    user: null,
  }),

  // Enables persisted state (requires @pinia/plugin-persistedstate or similar)
  persist: true,

  actions: {
    async login(credentials: Credentials): Promise<void> {
      try {
        // In Nuxt 3, $fetch is available globally or via useNuxtApp()
        const { $fetch } = useNuxtApp();
        const response = await $fetch<{ token: string; user: User }>(
          "/api/auth/login",
          {
            method: "POST",
            body: credentials,
          }
        );
        this.token = response.token;
        this.user = response.user;
      } catch (error) {
        console.error("Login failed:", error);
        throw error;
      }
    },

    logout(): void {
      this.token = null;
      this.user = null;
    },
  },
});
