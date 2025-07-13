<template>
  <div class="request-reset">
    <h2>Reset Password</h2>
    <form @submit.prevent="requestPasswordReset">
      <label>
        Email:
        <input type="email" v-model="email" required />
      </label>
      <button type="submit" :disabled="loading">
        {{ loading ? "Sending..." : "Send Reset Link" }}
      </button>
    </form>
    <p v-if="message" class="message">{{ message }}</p>
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { supabase } from "~/utils/supabase";

const email = ref("");
const loading = ref(false);
const message = ref("");
const error = ref("");

const requestPasswordReset = async () => {
  loading.value = true;
  message.value = "";
  error.value = "";

  try {
    // First: check if the email exists in the user table
    const { data: users, error: userFetchError } = await supabase
      .from("users") // You may need to replace with your actual public users table
      .select("email")
      .eq("email", email.value)
      .limit(1);

    if (userFetchError) {
      throw new Error("Could not verify email.");
    }

    if (!users || users.length === 0) {
      error.value =
        "Email does not exist. Please enter a valid registered email.";
      return;
    }

    // Second: send password reset email
    const { error: resetError } = await supabase.auth.resetPasswordForEmail(
      email.value,
      {
        redirectTo: `${window.location.origin}/reset-password`, // Adjust if needed
      }
    );

    if (resetError) {
      error.value = resetError.message;
    } else {
      message.value = "A password reset link has been sent to your email.";
    }
  } catch (err: any) {
    console.error(err);
    error.value = "An unexpected error occurred. Please try again.";
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.request-reset {
  max-width: 500px;
  margin: 0 auto;
  padding: 2em;
  background-color: #f9f9f9;
  border-radius: 8px;
  text-align: center;
}

.request-reset h2 {
  margin-bottom: 1em;
}

.request-reset form {
  display: flex;
  flex-direction: column;
  gap: 1em;
}

.request-reset input {
  padding: 0.5em;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.request-reset button {
  padding: 0.5em 1em;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.request-reset button:hover {
  background-color: #0056b3;
}

.message {
  margin-top: 1em;
  color: green;
}

.error {
  margin-top: 1em;
  color: red;
}
</style>
