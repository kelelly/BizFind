<template>
  <div id="app">
    <Header />
    <main>
      <Nuxt />
    </main>
    <Footer />
  </div>
</template>

<script>
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';

export default {
  components: {
    Header,
    Footer
  }
}
</script>

<style>
body {
  background-color: #f5f5f5; /* light grey background */
  color: #333; /* default text color */
  font-family: 'Arial', sans-serif;
  margin: 0;
  padding: 0;
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

main {
  flex: 1;
  padding: 20px;
}

a {
  color: #0066cc; /* link color */
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

.header,
.footer {
  background-color: #003366; /* dark blue */
  color: #fff;
  padding: 1em;
}

.footer {
  text-align: center;
  margin-top: auto;
}
</style>
