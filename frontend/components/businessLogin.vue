<template>
  <div class="business-login">
    <h2>Business Login</h2>

    <!-- Step 1: Email and Password -->
    <form
      @submit.prevent="handleConfirmBusinessName"
      v-if="!showBusinessNameField"
    >
      <label>
        Email:
        <input
          type="email"
          v-model="email"
          required
          placeholder="Enter your email"
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          v-model="password"
          required
          placeholder="Enter your password"
        />
      </label>
      <button type="submit" :disabled="isSubmitting">
        {{ isSubmitting ? "Checking..." : "Confirm Business Name" }}
      </button>
    </form>

    <!-- Step 2: Business Name Verification -->
    <form @submit.prevent="loginBusiness" v-else>
      <label>
        Email:
        <input type="email" v-model="email" disabled />
      </label>
      <label>
        Password:
        <input type="password" v-model="password" disabled />
      </label>
      <label>
        Business Name:
        <input
          type="text"
          v-model="businessName"
          required
          placeholder="Enter your business name"
        />
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
import { useAuth } from "~/composables/useAuth";

const showBusinessNameField = ref(false);
const businessName = ref("");
const email = ref("");
const password = ref("");
const isSubmitting = ref(false);

const router = useRouter();
const { login } = useAuth();

const handleConfirmBusinessName = async () => {
  isSubmitting.value = true;

  // Optional: You could verify the businessName later after login
  showBusinessNameField.value = true;

  isSubmitting.value = false;
};

const loginBusiness = async () => {
  isSubmitting.value = true;

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value,
    });

    if (error) throw error;

    // Optional: Fetch user-related business and verify businessName matches
    const { data: businessData, error: businessError } = await supabase
      .from("businesses")
      .select("name")
      .eq("email", email.value)
      .single();

    if (businessError || businessData?.name !== businessName.value.trim()) {
      throw new Error("Business name does not match records.");
    }

    alert("Login successful!");
    router.push("/business-dashboard");
  } catch (error: any) {
    console.error("Login error:", error.message);
    alert(error.message || "Login failed");
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
  text-align: center;
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
  transition: background-color 0.3s;
}

.business-login form button:hover {
  background-color: #0056b3;
}
</style>
