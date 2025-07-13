<template>
  <div class="user-login">
    <h2>User Login</h2>
    <form @submit.prevent="loginUser">
      <label>
        Email:
        <input type="email" v-model="email" required />
      </label>
      <label>
        Password:
        <input type="password" v-model="password" required />
      </label>
      <button type="submit" :disabled="isSubmitting">
        {{ isSubmitting ? "Logging in..." : "Login" }}
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuth } from "@/composables/useAuth";

const router = useRouter();
const { login } = useAuth();

const email = ref("");
const password = ref("");
const isSubmitting = ref(false);

const loginUser = async () => {
  isSubmitting.value = true;

  try {
    const { error } = await login(email.value, password.value);

    if (error) {
      alert("Login failed: " + error.message);
      return;
    }

    alert("Login successful!");
    router.push("/user-dashboard");
  } catch (err: any) {
    console.error("Login error:", err);
    alert("An error occurred. Please try again.");
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<style scoped>
.user-login {
  max-width: 600px;
  margin: 0 auto;
  padding: 2em;
  background-color: #ffffff;
  color: #1b1b1b;
}

.user-login h2 {
  margin-bottom: 1em;
}

.user-login form {
  display: flex;
  flex-direction: column;
}

.user-login form label {
  margin-bottom: 0.5em;
}

.user-login form input {
  margin-bottom: 1em;
  padding: 0.5em;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.user-login form button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 0.5em 1em;
  cursor: pointer;
  border-radius: 4px;
}

.user-login form button:hover {
  background-color: #0056b3;
}
</style>
