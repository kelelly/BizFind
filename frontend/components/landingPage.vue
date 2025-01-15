<template>
  <div class="landing-page">
    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-content">
        <h1>Welcome to BizFind</h1>
        <p>Your ultimate directory for discovering local businesses, from grocery stores to general shops.</p>
        <nuxt-link to="/search" class="cta-button">Find Your Local Business</nuxt-link>
      </div>
    </section>

    <!-- Featured Businesses Section -->
    <section class="featured-businesses">
      <h2>Featured Businesses</h2>
      <div v-if="featuredBusinesses.length" class="business-cards">
        <div v-for="business in featuredBusinesses" :key="business._id" class="business-card">
          <h3>{{ business.name }}</h3>
          <p>Category: {{ business.category }}</p>
          <p>Location: {{ business.address }}</p>
          <p>Phone: {{ business.phone }}</p>
          <p>Email: {{ business.email }}</p>
          <nuxt-link :to="`/business/${business._id}`" class="cta-button">View Profile</nuxt-link>
        </div>
      </div>
      <p v-else>No featured businesses available at the moment.</p>
    </section>

    <!-- Search Section -->
    <section class="search-section">
      <h2>Search for Businesses</h2>
      <form @submit.prevent="searchBusinesses" class="search-form">
        <input v-model="searchQuery" type="text" placeholder="Enter business name or category..." />
        <button type="submit" class="search-button">Search</button>
      </form>
    </section>

    <!-- About Section -->
    <section class="about">
      <h2>About Us</h2>
      <p>BizFind is committed to connecting you with the best local businesses. Our directory includes a variety of categories, ensuring you find exactly what you need. Whether you're looking for a nearby grocery store or a trusted general shop, BizFind is here to help.</p>
    </section>

    <!-- Footer -->
    <footer class="footer">
      <p>&copy; 2024 BizFind. All rights reserved.</p>
      <ul class="footer-links">
        <li><nuxt-link to="/privacy-policy">Privacy Policy</nuxt-link></li>
        <li><nuxt-link to="/terms-of-service">Terms of Service</nuxt-link></li>
        <li><nuxt-link to="/contact">Contact Us</nuxt-link></li>
      </ul>
    </footer>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

let LandingPage = {
  setup() {
    const router = useRouter();
    const searchQuery = ref('');
    const featuredBusinesses = ref([]);

    onMounted(async () => {
      try {
        const response = await fetch('/api/businesses?featured=true');
        const data = await response.json();
        featuredBusinesses.value = data;
      } catch (error) {
        console.error('Error fetching featured businesses:', error);
        featuredBusinesses.value = [];
      }
    });

    const searchBusinesses = async () => {
      if (searchQuery.value.trim()) {
        router.push(`/search?query=${encodeURIComponent(searchQuery.value)}`);
      } else {
        alert('Please enter a search query.');
      }
    };

    return {
      searchQuery,
      featuredBusinesses,
      searchBusinesses,
    };
  },
};
</script>

<style scoped>
.landing-page {
  font-family: Arial, sans-serif;
  color: #333;
}

.hero {
  background: #007BFF;
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
  background: #FFC107;
  text-decoration: none;
  border-radius: 5px;
  font-weight: bold;
  margin-top: 1em;
}

.featured-businesses, .search-section, .about {
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
  background: #007BFF;
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
  color: #007BFF;
  text-decoration: none;
}
</style>
