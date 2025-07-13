// composables/useAuth.ts
import { useUserStore } from "~/stores/user";
import { supabase } from "~/utils/supabase";

export const useAuth = () => {
  const userStore = useUserStore();
  const { $toast } = useNuxtApp();
  const router = useRouter();

  const login = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      $toast.error(error.message || "Login failed");
      throw error;
    }

    userStore.setUser(data.user);
    $toast.success("Login successful");
    router.push("/dashboard");
  };

  const register = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({ email, password });

    if (error) {
      $toast.error(error.message || "Registration failed");
      throw error;
    }

    $toast.success("Check your email to confirm registration");
  };

  const logout = async () => {
    await supabase.auth.signOut();
    userStore.logout();
    $toast.success("Logged out successfully");
    router.push("/login");
  };

  const getSession = async () => {
    const { data } = await supabase.auth.getSession();
    userStore.setUser(data.session?.user || null);
  };

  return {
    login,
    register,
    logout,
    getSession,
  };
};
