<template>
  <div class="landing-page">
    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-content">
        <h1>Welcome to BizFind</h1>
        <p>
          Your ultimate directory for discovering local businesses, from grocery
          stores to general shops.
        </p>
        <NuxtLink to="/search" class="cta-button"
          >Find Your Local Business</NuxtLink
        >
      </div>
    </section>

    <!-- Featured Businesses Section -->
    <section class="featured-businesses">
      <h2>Featured Businesses</h2>
      <div v-if="featuredBusinesses.length" class="business-cards">
        <div
          v-for="business in featuredBusinesses"
          :key="business._id"
          class="business-card"
        >
          <h3>{{ business.name }}</h3>
          <p>Category: {{ business.category }}</p>
          <p>Location: {{ business.address }}</p>
          <p>Phone: {{ business.phone }}</p>
          <p>Email: {{ business.email }}</p>
          <NuxtLink :to="`/business/${business._id}`" class="cta-button"
            >View Profile</NuxtLink
          >
        </div>
      </div>
      <p v-else>No featured businesses available at the moment.</p>
    </section>

    <!-- Search Section -->
    <section class="search-section">
      <h2>Search for Businesses</h2>
      <form @submit.prevent="searchBusinesses" class="search-form">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Enter business name or category..."
        />
        <button type="submit" class="search-button">Search</button>
      </form>
    </section>

    <!-- About Section -->
    <section class="about">
      <h2>About Us</h2>
      <p>
        BizFind is committed to connecting you with the best local businesses.
        Our directory includes a variety of categories, ensuring you find
        exactly what you need. Whether you're looking for a nearby grocery store
        or a trusted general shop, BizFind is here to help.
      </p>
    </section>

    <!-- Footer -->
    <footer class="footer">
      <p>&copy; 2024 BizFind. All rights reserved.</p>
      <ul class="footer-links">
        <li><NuxtLink to="/privacy-policy">Privacy Policy</NuxtLink></li>
        <li><NuxtLink to="/terms-of-service">Terms of Service</NuxtLink></li>
        <li><NuxtLink to="/contact">Contact Us</NuxtLink></li>
      </ul>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const searchQuery = ref("");
const featuredBusinesses = ref<any[]>([]);

onMounted(async () => {
  try {
    const response = await fetch("/api/businesses?featured=true");
    const data = await response.json();
    featuredBusinesses.value = data;
  } catch (error) {
    console.error("Error fetching featured businesses:", error);
    featuredBusinesses.value = [];
  }
});

const searchBusinesses = () => {
  if (searchQuery.value.trim()) {
    router.push(`/search?query=${encodeURIComponent(searchQuery.value)}`);
  } else {
    alert("Please enter a search query.");
  }
};
</script>

<style scoped>
.landing-page {
  font-family: Arial, sans-serif;
  color: #333;
}

.hero {
  background: #007bff;
  color: white;
  padding: 2em;
  text-align: center;
}

.hero-content {
  max-width: 600px;
  margin: 0 auto;
}

.cta-button {
  display: inline-block;
  padding: 0.75em 1.5em;
  color: white;
  background: #ffc107;
  text-decoration: none;
  border-radius: 5px;
  font-weight: bold;
  margin-top: 1em;
}

.featured-businesses,
.search-section,
.about {
  padding: 2em;
}

.business-cards {
  display: flex;
  flex-wrap: wrap;
  gap: 1em;
}

.business-card {
  border: 1px solid #ddd;
  padding: 1em;
  margin: 0.5em;
  width: calc(33.333% - 1em);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
}

.search-section {
  text-align: center;
}

.search-form {
  display: flex;
  justify-content: center;
  gap: 0.5em;
}

.search-button {
  padding: 0.75em 1.5em;
  color: white;
  background: #007bff;
  border: none;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
}

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
  color: #007bff;
  text-decoration: none;
}
</style>
