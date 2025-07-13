// composables/useContact.ts
import { supabase } from "~/utils/supabase";

export const useContact = () => {
  const submitMessage = async (contactForm) => {
    const { error } = await supabase
      .from("contact_messages")
      .insert([contactForm]);
    return error;
  };

  return { submitMessage };
};
