<template>
  <div class="not-found">
    <h1>404 - Page Not Found</h1>
    <p>
      Sorry, the page you are looking for does not exist. It might have been moved or deleted.
    </p>
    <p>
      <router-link to="/">Return to Home</router-link>
    </p>
  </div>
</template>

<script>
export const NotFound = {};
</script>

<style scoped>
.not-found {
  max-width: 600px;
  margin: 0 auto;
  padding: 2em;
  text-align: center;
  background-color: #ffffff; /* White background */
  color: #1b1b1b; /* Dark blue (almost black) text color */
}

.not-found h1 {
  margin-bottom: 1em;
}

.not-found p {
  margin-bottom: 1em;
}

.not-found a {
  color: #007bff;
}

.not-found a:hover {
  text-decoration: underline;
}
</style>
