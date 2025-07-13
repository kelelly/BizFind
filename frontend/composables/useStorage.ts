// composables/useStorage.ts
import { supabase } from "~/utils/supabase"; // ✅ Use central client

export const useStorage = () => {
  const uploadFile = async (bucket: string, path: string, file: File) => {
    return await supabase.storage.from(bucket).upload(path, file);
  };

  const getPublicUrl = (bucket: string, path: string) => {
    return supabase.storage.from(bucket).getPublicUrl(path).data.publicUrl;
  };

  return { uploadFile, getPublicUrl };
};
