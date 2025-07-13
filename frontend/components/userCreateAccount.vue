<template>
  <div class="user-register">
    <h2>Create User Account</h2>
    <form @submit.prevent="registerUser">
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
      <button type="submit" :disabled="isSubmitting">
        {{ isSubmitting ? "Registering..." : "Register" }}
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuth } from "@/composables/useAuth";

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

const isSubmitting = ref(false);
const router = useRouter();
const { signUp } = useAuth();

const registerUser = async () => {
  isSubmitting.value = true;

  try {
    const { error } = await signUp(
      user.value.email,
      user.value.password,
      user.value.username
    );

    if (error) {
      alert("Registration failed. " + error.message);
      return;
    }

    alert("Account created! Please check your email to confirm.");
    router.push("/user-login");
  } catch (err: any) {
    console.error("Registration error:", err.message || err);
    alert("Registration failed. " + (err.message || ""));
  } finally {
    isSubmitting.value = false;
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
</style>
