<template>
  <!-- same template as before -->
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useAuth } from "@/composables/useAuth";

interface User {
  username: string;
  email: string;
  password: string;
}

const { getSession, updateProfileData } = useAuth();

const user = ref<User>({
  username: "",
  email: "",
  password: "",
});

const view = ref<string>("profile"); // Default view

const fetchUserProfile = async (): Promise<void> => {
  try {
    const { data: sessionData, error: sessionError } = await getSession();

    if (sessionError || !sessionData.session) {
      console.error("Error retrieving session:", sessionError?.message);
      return;
    }

    const supabase = useAuth().supabase;

    const userId = sessionData.session.user.id;

    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();

    if (error) {
      console.error("Error fetching profile:", error.message);
      return;
    }

    user.value = {
      username: data.username || "",
      email: sessionData.session.user.email || "",
      password: "", // never store password in UI
    };
  } catch (error) {
    console.error("Error fetching user profile:", error);
  }
};

const updateProfile = async (): Promise<void> => {
  try {
    const { username } = user.value;

    const { error } = await updateProfileData({ username });

    if (error) throw error;

    alert("Profile updated successfully!");
  } catch (error: any) {
    console.error("Error updating profile:", error?.message || error);
    alert("Profile update failed. Please try again.");
  }
};

onMounted(fetchUserProfile);
</script>

<style scoped>
.user-profile {
  max-width: 600px;
  margin: 0 auto;
  padding: 2em;
  background-color: #ffffff;
  color: #1b1b1b;
}

.user-profile h2 {
  margin-bottom: 1em;
}

.user-profile form {
  display: flex;
  flex-direction: column;
}

.user-profile form label {
  margin-bottom: 0.5em;
}

.user-profile form input {
  margin-bottom: 1em;
  padding: 0.5em;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.user-profile form button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 0.5em 1em;
  cursor: pointer;
  border-radius: 4px;
}

.user-profile form button:hover {
  background-color: #0056b3;
}

.user-profile p {
  margin-top: 1em;
}

.user-profile a {
  color: #007bff;
  cursor: pointer;
}

.user-profile a:hover {
  text-decoration: underline;
}
</style>
