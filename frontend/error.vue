<template>
  <div class="error-page">
    <div class="error-content">
      <h2 class="error-title">
        {{ error.statusCode === 404 ? "Page Not Found" : "An Error Occurred" }}
      </h2>
      <p class="error-message">{{ error.message }}</p>
      <div class="error-actions">
        <button class="error-button" @click="handleError">Back to Home</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const error = useError();

const handleError = async () => {
  await clearError({ redirect: "/" });
};
</script>

<style scoped>
.error-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f9fafb;
  padding: 1.5rem;
}

.error-content {
  max-width: 28rem;
  width: 100%;
  text-align: center;
}

.error-title {
  margin-top: 1.5rem;
  font-size: 1.875rem;
  font-weight: 800;
  color: #111827;
}

.error-message {
  margin-top: 0.5rem;
  font-size: 0.875rem;
  color: #4b5563;
}

.error-actions {
  margin-top: 2rem;
}

.error-button {
  width: 100%;
  padding: 0.5rem 1rem;
  background-color: #3b82f6;
  color: white;
  font-weight: 500;
  border-radius: 0.375rem;
  transition: background-color 0.2s;
}

.error-button:hover {
  background-color: #2563eb;
}
</style>
