<template>
  <!-- same template as before -->
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

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
const newPassword = ref<string>("");
const view = ref<string>("profile"); // Default view

const fetchUserProfile = async (): Promise<void> => {
  try {
    const response = await fetch("/api/users/profile");
    user.value = await response.json();
  } catch (error) {
    console.error("Error fetching user profile:", error);
  }
};

const updateProfile = async (): Promise<void> => {
  try {
    const { password, ...userData } = user.value;
    await fetch("/api/users/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...userData, password }),
    });
    alert("Profile updated successfully!");
  } catch (error) {
    console.error("Error updating profile:", error);
    alert("Profile update failed. Please try again.");
  }
};

const resetPassword = async (): Promise<void> => {
  try {
    await fetch("/api/users/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: newPassword.value }),
    });
    alert("Password reset successful!");
    newPassword.value = ""; // Clear the new password field
  } catch (error) {
    console.error("Error resetting password:", error);
    alert("Password reset failed. Please try again.");
  }
};

onMounted(fetchUserProfile);
</script>

<style scoped>
.user-profile {
  max-width: 600px;
  margin: 0 auto;
  padding: 2em;
  background-color: #ffffff;
  color: #1b1b1b;
}

.user-profile h2 {
  margin-bottom: 1em;
}

.user-profile form {
  display: flex;
  flex-direction: column;
}

.user-profile form label {
  margin-bottom: 0.5em;
}

.user-profile form input {
  margin-bottom: 1em;
  padding: 0.5em;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.user-profile form button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 0.5em 1em;
  cursor: pointer;
  border-radius: 4px;
}

.user-profile form button:hover {
  background-color: #0056b3;
}

.user-profile p {
  margin-top: 1em;
}

.user-profile a {
  color: #007bff;
  cursor: pointer;
}

.user-profile a:hover {
  text-decoration: underline;
}
</style>
