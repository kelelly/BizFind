<template>
  <div>
    <UserLogin />
    <p class="forgot-link">
      <NuxtLink to="/forgotPassword">Forgot your password?</NuxtLink>
    </p>
  </div>
</template>

<script setup lang="ts">
import UserLogin from "~/components/userLogin.vue";
</script>

<style scoped>
.forgot-link {
  margin-top: 1em;
  text-align: center;
}

.forgot-link a {
  color: #007bff;
  text-decoration: none;
}

.forgot-link a:hover {
  text-decoration: underline;
}
</style>
