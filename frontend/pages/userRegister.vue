<template>
  <div class="user-register">
    <h2>Register</h2>
    <form @submit.prevent="register">
      <label>
        Username:
        <input type="text" v-model="user.username" required />
      </label>
      <label>
        Email:
        <input type="email" v-model="user.email" required />
      </label>
      <label>
        Password:
        <input type="password" v-model="user.password" required />
      </label>
      <button type="submit">Register</button>
    </form>
    <p>Already have an account? <NuxtLink to="/login">Login here</NuxtLink></p>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useSupabase } from "@/composables/useSupabase";

interface User {
  username: string;
  email: string;
  password: string;
}

const user = ref<User>({
  username: "",
  email: "",
  password: "",
});

const router = useRouter();
const supabase = useSupabase();

const register = async (): Promise<void> => {
  try {
    // 1. Sign up the user in Supabase Auth
    const { data, error } = await supabase.auth.signUp({
      email: user.value.email,
      password: user.value.password,
    });

    if (error) {
      console.error("Supabase sign up error:", error.message);
      alert("Registration failed. " + error.message);
      return;
    }

    const userId = data.user?.id;

    // 2. Save additional profile data if user was created
    if (userId) {
      const { error: profileError } = await supabase.from("profiles").insert([
        {
          id: userId,
          username: user.value.username,
        },
      ]);

      if (profileError) {
        console.error("Error saving profile data:", profileError.message);
        alert("Profile save failed. Please try again.");
        return;
      }
    }

    alert("Registration successful! Please check your email to confirm.");
    router.push("/login");
  } catch (error: any) {
    console.error("Error registering:", error?.message || error);
    alert("Registration failed. Please try again.");
  }
};
</script>

<style scoped>
.user-register {
  max-width: 600px;
  margin: 0 auto;
  padding: 2em;
  background-color: #ffffff;
  color: #1b1b1b;
}

.user-register h2 {
  margin-bottom: 1em;
}

.user-register form {
  display: flex;
  flex-direction: column;
}

.user-register form label {
  margin-bottom: 0.5em;
}

.user-register form input {
  margin-bottom: 1em;
  padding: 0.5em;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.user-register form button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 0.5em 1em;
  cursor: pointer;
  border-radius: 4px;
}

.user-register form button:hover {
  background-color: #0056b3;
}

.user-register p {
  margin-top: 1em;
}

.user-register a {
  color: #007bff;
  cursor: pointer;
}

.user-register a:hover {
  text-decoration: underline;
}
</style>
