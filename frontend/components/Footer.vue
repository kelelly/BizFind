<template>
  <footer class="footer">
    <div class="footer-content">
      <div class="footer-left">
        <h3>About BizFind</h3>
        <p>
          BizFind is your ultimate business directory, connecting customers with
          businesses seamlessly.
        </p>
      </div>
      <div class="footer-middle">
        <h3>Quick Links</h3>
        <ul>
          <li><NuxtLink to="/">Home</NuxtLink></li>
          <li><NuxtLink to="/businesses">Businesses</NuxtLink></li>
          <li><NuxtLink to="/about">About Us</NuxtLink></li>
          <li><NuxtLink to="/contact">Contact Us</NuxtLink></li>
        </ul>
      </div>
      <div class="footer-right">
        <h3>Contact Information</h3>
        <p>
          Address: 2500 Main St, Eldoret<br />
          Phone: +254716517145 / +254742584681<br />
          Email: bizfind@gmail.com
        </p>
      </div>
    </div>
    <div class="footer-bottom">
      <p>&copy; {{ currentYear }} BizFind. All rights reserved.</p>
    </div>
  </footer>
</template>

<script setup lang="ts">
const currentYear = new Date().getFullYear();
</script>

<style scoped>
.footer {
  background-color: var(--color-dark-blue);
  color: var(--color-white);
  padding: 30px 20px;
  margin-top: auto;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
}

.footer-left,
.footer-middle,
.footer-right {
  flex: 1;
  margin-right: 20px;
  min-width: 200px;
}

.footer-left h3,
.footer-middle h3,
.footer-right h3 {
  color: var(--color-gold);
  font-size: 18px;
}

.footer-left p,
.footer-right p {
  color: var(--color-white);
}

.footer-middle ul {
  list-style: none;
  padding: 0;
}

.footer-middle li {
  margin-bottom: 10px;
}

.footer-middle a {
  color: var(--color-white);
  text-decoration: none;
  transition: color 0.3s;
}

.footer-middle a:hover {
  color: var(--color-gold);
}

.footer-bottom {
  margin-top: 20px;
  text-align: center;
}
</style>
