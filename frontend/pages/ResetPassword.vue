<template>
  <div class="reset-password">
    <h2>Reset Your Password</h2>

    <form @submit.prevent="handlePasswordReset" v-if="!success">
      <label>
        New Password:
        <input type="password" v-model="newPassword" required />
      </label>
      <button type="submit" :disabled="isSubmitting">
        {{ isSubmitting ? "Updating..." : "Update Password" }}
      </button>
      <p v-if="error" class="error">{{ error }}</p>
    </form>

    <div v-else class="success-message">
      <p>✅ Your password has been successfully updated.</p>
      <NuxtLink to="/user-login" class="back-link"> Login Now </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useAuth } from "@/composables/useAuth";

const router = useRouter();
const { updatePassword, getSession } = useAuth();

const newPassword = ref("");
const isSubmitting = ref(false);
const success = ref(false);
const error = ref("");

const handlePasswordReset = async () => {
  isSubmitting.value = true;
  error.value = "";

  try {
    const { error: updateError } = await updatePassword(newPassword.value);

    if (updateError) throw updateError;

    success.value = true;
  } catch (err: any) {
    console.error(err);
    error.value = err.message || "Password reset failed.";
  } finally {
    isSubmitting.value = false;
  }
};

onMounted(async () => {
  const { data, error: sessionError } = await getSession();
  if (!data?.session) {
    console.warn("No session found for password reset.");
    router.push("/user-login");
  }
});
</script>

<style scoped>
.reset-password {
  max-width: 500px;
  margin: 0 auto;
  padding: 2em;
  background-color: #ffffff;
  color: #1b1b1b;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.reset-password h2 {
  text-align: center;
  margin-bottom: 1em;
}

.reset-password form {
  display: flex;
  flex-direction: column;
}

.reset-password label {
  margin-bottom: 1em;
}

.reset-password input {
  padding: 0.5em;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
}

.reset-password button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 0.75em;
  cursor: pointer;
  border-radius: 4px;
  margin-top: 1em;
}

.reset-password button:hover {
  background-color: #0056b3;
}

.error {
  color: red;
  margin-top: 1em;
}

.success-message {
  text-align: center;
}

.success-message .back-link {
  display: inline-block;
  margin-top: 1em;
  text-decoration: underline;
  color: #007bff;
}
</style>
