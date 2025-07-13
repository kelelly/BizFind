// composables/useSession.ts
import { supabase } from "~/utils/supabase";
import { ref, onMounted } from "vue";

const session = ref(null);

export const useSession = () => {
  onMounted(() => {
    supabase.auth.getSession().then(({ data }) => {
      session.value = data.session;
    });

    supabase.auth.onAuthStateChange((_event, newSession) => {
      session.value = newSession;
    });
  });

  return { session };
};
