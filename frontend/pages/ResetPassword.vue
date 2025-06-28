<template>
  <div class="reset-password-page">
    <h2>Reset Password</h2>
    <form @submit.prevent="resetPassword">
      <label>
        New Password:
        <input type="password" v-model="newPassword" required />
      </label>
      <button type="submit">Reset Password</button>
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    </form>
    <div class="navigation-buttons">
      <button @click="step = 'register'">Create Account</button>
      <button @click="step = 'forgotPassword'">Forgot Password</button>
      <button @click="step = 'resetPassword'">Reset Password</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";

const newPassword = ref<string>("");
const email = ref<string>(""); // Only used in forgot password step
const resetToken = ref<string>("");
const accountType = ref<string>("");
const errorMessage = ref<string>("");
const router = useRouter();
const step = ref<string>("resetPassword"); // Default step

const resetPassword = async (): Promise<void> => {
  try {
    let url: string;
    if (accountType.value === "user") {
      url = `/api/users/reset-password/${resetToken.value}`;
    } else if (accountType.value === "business") {
      url = `/api/businesses/reset-password/${resetToken.value}`;
    } else {
      errorMessage.value = "Invalid account type.";
      return;
    }

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: newPassword.value }),
    });

    if (response.ok) {
      alert(
        "Password reset successful! You can now log in with your new password."
      );
      router.push({ name: "login" }); // Redirect to login page after successful reset
    } else {
      console.error("Error resetting password:", response);
      errorMessage.value = "Password reset failed. Please try again.";
    }
  } catch (error) {
    console.error("Error resetting password:", error);
    errorMessage.value = "Password reset failed. Please try again.";
  }
};
</script>

<style scoped>
.reset-password-page {
  max-width: 600px;
  margin: 0 auto;
  padding: 2em;
  background-color: #ffffff;
  color: #1b1b1b;
}

.reset-password-page h2 {
  margin-bottom: 1em;
}

.reset-password-page form {
  display: flex;
  flex-direction: column;
}

.reset-password-page form label {
  margin-bottom: 0.5em;
}

.reset-password-page form input {
  margin-bottom: 1em;
  padding: 0.5em;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.reset-password-page form button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 0.5em 1em;
  cursor: pointer;
  border-radius: 4px;
}

.reset-password-page form button:hover {
  background-color: #0056b3;
}

.reset-password-page .error {
  color: red;
  margin-top: 1em;
}

.reset-password-page .navigation-buttons {
  margin-top: 2em;
  display: flex;
  gap: 1em;
}

.reset-password-page .navigation-buttons button {
  background-color: #f8f9fa;
  color: #007bff;
  border: 1px solid #007bff;
  padding: 0.5em 1em;
  cursor: pointer;
  border-radius: 4px;
}

.reset-password-page .navigation-buttons button:hover {
  background-color: #e9ecef;
}
</style>
