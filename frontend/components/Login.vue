<template>
  <div class="login">
    <h2>Login</h2>

    <!-- Tabs -->
    <div class="login-tabs">
      <button
        :class="{ active: selectedAccountType === 'business' }"
        @click="selectAccountType('business')"
      >
        Business
      </button>
      <button
        :class="{ active: selectedAccountType === 'user' }"
        @click="selectAccountType('user')"
      >
        User
      </button>
    </div>

    <!-- Business Login Form -->
    <form
      v-if="selectedAccountType === 'business'"
      @submit.prevent="handleBusinessLogin"
      class="login-form"
    >
      <label>
        Business Name:
        <input type="text" v-model="businessName" required />
      </label>
      <label>
        Email:
        <input type="email" v-model="email" required />
      </label>
      <label>
        Password:
        <input type="password" v-model="password" required />
      </label>
      <button type="submit" :disabled="isSubmitting">
        {{ isSubmitting ? "Logging in..." : "Login as Business" }}
      </button>
    </form>

    <!-- User Login Form -->
    <form
      v-else-if="selectedAccountType === 'user'"
      @submit.prevent="handleUserLogin"
      class="login-form"
    >
      <label>
        Email:
        <input type="email" v-model="email" required />
      </label>
      <label>
        Password:
        <input type="password" v-model="password" required />
      </label>
      <button type="submit" :disabled="isSubmitting">
        {{ isSubmitting ? "Logging in..." : "Login as User" }}
      </button>
    </form>

    <!-- Links -->
    <p>
      Don't have an account?
      <nuxt-link to="/register">Register here</nuxt-link>
    </p>
    <p>
      <nuxt-link to="/forgot-password">Forgot Password?</nuxt-link>
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";

const selectedAccountType = ref<"business" | "user" | null>(null);
const email = ref("");
const password = ref("");
const businessName = ref("");
const isSubmitting = ref(false);

const router = useRouter();

const selectAccountType = (type: "business" | "user") => {
  selectedAccountType.value = type;
  // Reset fields when switching
  email.value = "";
  password.value = "";
  businessName.value = "";
};

const handleBusinessLogin = async () => {
  isSubmitting.value = true;
  try {
    const response = await fetch("/api/business/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        businessName: businessName.value,
        email: email.value,
        password: password.value,
      }),
    });

    if (!response.ok) throw new Error("Invalid Business credentials");

    const { token } = await response.json();
    localStorage.setItem("token", token);
    router.push({ name: "BusinessDashboard" });
  } catch (error) {
    alert(error.message);
  } finally {
    isSubmitting.value = false;
  }
};

const handleUserLogin = async () => {
  isSubmitting.value = true;
  try {
    const response = await fetch("/api/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email.value,
        password: password.value,
      }),
    });

    if (!response.ok) throw new Error("Invalid User credentials");

    const { token } = await response.json();
    localStorage.setItem("token", token);
    router.push({ name: "UserDashboard" });
  } catch (error) {
    alert(error.message);
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<style scoped>
.login {
  max-width: 600px;
  margin: 0 auto;
  padding: 2em;
  background-color: #fff;
  color: #1b1b1b;
}

.login h2 {
  margin-bottom: 1em;
  text-align: center;
}

.login-tabs {
  display: flex;
  justify-content: center;
  margin-bottom: 1.5em;
  flex-wrap: wrap;
}

.login-tabs button {
  flex: 1;
  min-width: 120px;
  padding: 0.75em;
  margin: 0.25em;
  border: 1px solid #007bff;
  background-color: white;
  color: #007bff;
  cursor: pointer;
  border-radius: 4px;
  font-weight: bold;
  transition: background-color 0.3s, color 0.3s;
}

.login-tabs button.active {
  background-color: #007bff;
  color: white;
}

.login-form {
  display: flex;
  flex-direction: column;
}

.login-form label {
  margin-bottom: 0.5em;
}

.login-form input {
  margin-bottom: 1em;
  padding: 0.5em;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.login-form button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 0.5em 1em;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.login-form button:hover {
  background-color: #0056b3;
}

.login p {
  margin-top: 1em;
  text-align: center;
}

.login a {
  color: #007bff;
  cursor: pointer;
}

.login a:hover {
  text-decoration: underline;
}

/* Responsive */
@media (max-width: 480px) {
  .login-tabs {
    flex-direction: column;
  }
}
</style>
