<template>
  <div class="login-page">
    <h2>Login</h2>
    <div class="login-buttons">
      <NuxtLink to="/loginPages/user" class="login-link-button">
        Login as User
      </NuxtLink>
      <NuxtLink to="/loginPages/business" class="login-link-button">
        Login as Business
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts"></script>
<style scoped>
.login-page {
  max-width: 600px;
  margin: 0 auto;
  padding: 2em;
  background-color: #ffffff;
  color: #1b1b1b;
  text-align: center;
}

.login-buttons {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 2em;
}

.login-link-button {
  flex: 1 1 200px;
  margin: 1em;
  padding: 1em 2em;
  background-color: #007bff;
  color: white;
  text-align: center;
  border-radius: 4px;
  font-weight: bold;
  text-decoration: none;
  transition: background-color 0.3s;
}

.login-link-button:hover {
  background-color: #0056b3;
}

@media (max-width: 600px) {
  .login-buttons {
    flex-direction: column;
  }
}
</style>
