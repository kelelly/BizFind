import { createClient } from "@supabase/supabase-js";

export default defineNuxtPlugin(() => {
  const supabaseUrl = useRuntimeConfig().public.supabaseUrl;
  const supabaseKey = useRuntimeConfig().public.supabaseKey;

  const supabase = createClient(supabaseUrl, supabaseKey);

  return {
    provide: {
      supabase,
    },
  };
});
