<template>
  <div>
    <!-- Use the LandingPage component -->
    <LandingPage />
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import LandingPage from '~/components/landingPage.vue';

export const IndexPage = defineComponent({
  components: {
    LandingPage
  }
});
</script>

<style scoped>
/* General Styles for the Index Page */
body {
  margin: 0;
  font-family: Arial, sans-serif;
  color: #333;
  background-color: #f4f4f4;
}

* {
  box-sizing: border-box;
}

a {
  text-decoration: none;
}

button {
  cursor: pointer;
}

.cta-button {
  background-color: #FFC107;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 0.75em 1.5em;
  font-weight: bold;
}

.cta-button:hover {
  background-color: #ffb300;
}

/* Footer Styles */
.footer {
  background: #f8f9fa;
  padding: 1em;
  text-align: center;
}

.footer-links {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-links li {
  display: inline;
  margin: 0 0.5em;
}

.footer-links a {
  color: #007BFF;
  text-decoration: none;
}

.footer-links a:hover {
  text-decoration: underline;
}
</style>
