// composables/useBusiness.ts
import { supabase } from "~/utils/supabase";

export const useBusiness = () => {
  const fetchBusinesses = async () => {
    const { data, error } = await supabase.from("businesses").select("*");
    return { data, error };
  };

  const addBusiness = async (business: any) => {
    const { error } = await supabase.from("businesses").insert([business]);
    return { success: !error, error };
  };

  const updateBusiness = async (id: string, updates: any) => {
    const { error } = await supabase
      .from("businesses")
      .update(updates)
      .eq("id", id);
    return { success: !error, error };
  };

  return { fetchBusinesses, addBusiness, updateBusiness };
};
