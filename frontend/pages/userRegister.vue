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
    <p>
      Already have an account? <NuxtLink to="/login">Login here</NuxtLink>
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";

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

const register = async (): Promise<void> => {
  try {
    const response = await fetch("/api/users/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user.value),
    });

    if (!response.ok) {
      throw new Error("Registration failed");
    }

    alert("Registration successful! Please log in.");
    router.push("/login");
  } catch (error) {
    console.error("Error registering:", error);
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
