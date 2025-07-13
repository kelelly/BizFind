// composables/useUser.ts
import { ref, onMounted } from "vue";
import { supabase } from "~/utils/supabase";

const user = ref(null);

export const useUser = () => {
  const fetchUser = async () => {
    const { data } = await supabase.auth.getUser();
    user.value = data.user;
  };

  onMounted(fetchUser);

  return { user, fetchUser };
};
