<template>
  <button @click="handleLogout" class="logout-btn">Logout</button>
</template>

<script setup lang="ts">
import { useAuth } from "~/composables/useAuth";

const { logout } = useAuth();

const handleLogout = async () => {
  try {
    await logout();
  } catch (error) {
    console.error("Logout error:", error);
    alert("Logout failed. Please try again.");
  }
};
</script>

<style scoped>
.logout-btn {
  padding: 0.5em 1em;
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.logout-btn:hover {
  background-color: #c82333;
}
</style>
