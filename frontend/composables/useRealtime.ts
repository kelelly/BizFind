// composables/useRealtime.ts
import { supabase } from "~/utils/supabase"; // ✅ Use centralized client

export const useRealtime = () => {
  const subscribeToBusinesses = (callback: (payload: any) => void) => {
    const channel = supabase
      .channel("public:businesses")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "businesses" },
        callback
      )
      .subscribe();

    // Return an unsubscribe function
    return () => {
      supabase.removeChannel(channel);
    };
  };

  return { subscribeToBusinesses };
};
