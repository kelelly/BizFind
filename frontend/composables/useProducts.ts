// composables/useProducts.ts
import { supabase } from "~/utils/supabase";

export const useProducts = () => {
  const fetchProductById = async (id: string) => {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("id", id)
      .single();
    return { data, error };
  };

  const addProduct = async (product: any) => {
    const { error } = await supabase.from("products").insert([product]);
    return { success: !error, error };
  };

  const updateProduct = async (id: string, updates: any) => {
    const { error } = await supabase
      .from("products")
      .update(updates)
      .eq("id", id);
    return { success: !error, error };
  };

  const deleteProduct = async (id: string) => {
    const { error } = await supabase.from("products").delete().eq("id", id);
    return { success: !error, error };
  };

  return {
    fetchProductById,
    addProduct,
    updateProduct,
    deleteProduct,
  };
};
