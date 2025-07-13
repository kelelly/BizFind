// stores/user.ts
import { defineStore } from "pinia";
import { supabase } from "~/utils/supabase";

interface UserState {
  user: any | null;
  isAuthenticated: boolean;
}

export const useUserStore = defineStore("user", {
  state: (): UserState => ({
    user: null,
    isAuthenticated: false,
  }),

  getters: {
    currentUser: (state) => state.user,
    isLoggedIn: (state) => state.isAuthenticated,
  },

  actions: {
    setUser(user: any) {
      this.user = user;
      this.isAuthenticated = !!user;
    },

    logout() {
      const supabase = useSupabase();
      supabase.auth.signOut();
      this.user = null;
      this.isAuthenticated = false;
    },

    async fetchSession() {
      const supabase = useSupabase();
      const { data } = await supabase.auth.getSession();
      this.setUser(data.session?.user || null);
    },

    listenToAuthChanges() {
      const supabase = useSupabase();
      supabase.auth.onAuthStateChange((event, session) => {
        this.setUser(session?.user || null);
      });
    },
  },

  persist: true,
});
