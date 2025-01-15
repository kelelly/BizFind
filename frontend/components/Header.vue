<template>
  <header class="header">
    <div class="logo">
      <img src="@/client/assets/images/logo.png" alt="BizFind Logo" />
      <h1>BizFind</h1>
    </div>
    <nav class="nav">
      <ul>
        <li><nuxt-link to="/">Home</nuxt-link></li>
        <li><nuxt-link to="/businesses">Businesses</nuxt-link></li>
        <li><nuxt-link to="/about">About</nuxt-link></li>
        <li><nuxt-link to="/contact">Contact</nuxt-link></li>
      </ul>
    </nav>
  </header>
</template>

<script>
let Header = {
  setup() {
    // No setup needed for this component
  },
};
</script>

<style scoped>
.header {
  background-color: var(--color-dark-blue);
  color: var(--color-white);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.logo {
  display: flex;
  align-items: center;
}

.logo img {
  height: 50px;
  margin-right: 10px;
}

.logo h1 {
  font-size: 24px;
  color: var(--color-gold);
}

.nav ul {
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
}

.nav li {
  margin-left: 20px;
}

.nav a {
  color: var(--color-white);
  text-decoration: none;
  font-size: 18px;
  transition: color 0.3s;
}

.nav a:hover {
  color: var(--color-gold);
}
</style>
