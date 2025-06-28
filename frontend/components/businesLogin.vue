<template>
  <div class="business-login">
    <h2>Business Login</h2>
    <form @submit.prevent="loginBusiness">
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

const email = ref("");
const password = ref("");
const isSubmitting = ref(false);

const router = useRouter();

const loginBusiness = async (): Promise<void> => {
  isSubmitting.value = true;
  try {
    const response = await fetch("/api/business/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email.value,
        password: password.value,
      }),
    });

    if (!response.ok) throw new Error("Invalid Business credentials");

    const { token } = await response.json();
    localStorage.setItem("token", token);
    router.push("/business-dashboard");
  } catch (error) {
    console.error("Login failed:", error);
    alert("Login failed");
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<style scoped>
.business-login {
  max-width: 600px;
  margin: 0 auto;
  padding: 2em;
  background-color: #ffffff;
  color: #1b1b1b;
}

.business-login h2 {
  margin-bottom: 1em;
}

.business-login form {
  display: flex;
  flex-direction: column;
}

.business-login form label {
  margin-bottom: 0.5em;
}

.business-login form input {
  margin-bottom: 1em;
  padding: 0.5em;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.business-login form button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 0.5em 1em;
  cursor: pointer;
  border-radius: 4px;
}

.business-login form button:hover {
  background-color: #0056b3;
}
</style>
