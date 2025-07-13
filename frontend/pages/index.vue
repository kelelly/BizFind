<template>
  <div class="landing-page">
    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-content">
        <h2 class="text-5xl font-bold">Welcome to BizFind</h2>
        <p class="text-2xl italic mt-4">
          Your ultimate directory for discovering local businesses — from
          grocery stores to general shops to supermarkets.
        </p>
      </div>
    </section>

    <!-- Search Section -->
    <section class="search-section">
      <h2 class="text-3xl font-semibold mb-4">Search for Businesses</h2>
      <form @submit.prevent="searchBusinesses" class="search-form">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Enter business name or category..."
        />
        <button type="submit" class="search-button">Search</button>
      </form>
    </section>

    <!-- Features Section -->
    <section class="container py-8">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="feature in features"
          :key="feature.title"
          class="bg-white p-6 rounded-lg shadow-md"
        >
          <h3 class="text-xl font-semibold mb-3">{{ feature.title }}</h3>
          <p class="text-gray-600">{{ feature.description }}</p>
        </div>
      </div>

      <!-- Latest Businesses -->
      <div class="mt-12">
        <h2 class="text-2xl font-bold mb-4">Latest Businesses</h2>
        <div
          v-if="businesses?.value?.length"
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <BusinessCard
            v-for="business in businesses.value"
            :key="business.id"
            :business="business"
          />
        </div>
        <div v-else class="text-center py-8 text-gray-500">
          Loading businesses...
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useHead } from "#imports";
import BusinessCard from "@/components/BusinessCard.vue";
import { useBusiness } from "@/composables/useBusiness";

const router = useRouter();
const searchQuery = ref("");

const features = [
  {
    title: "Discover Businesses",
    description:
      "Find the perfect business partners and opportunities in your area.",
  },
  {
    title: "Connect & Grow",
    description: "Build meaningful connections and grow your business network.",
  },
  {
    title: "Verified Reviews",
    description:
      "Make informed decisions with authentic reviews from real users.",
  },
];

// ⬇️ NEW: Replace old fetch with composable
const { businesses, fetchBusinesses, loading, error } = useBusiness();

onMounted(fetchBusinesses);

const searchBusinesses = () => {
  const trimmed = searchQuery.value.trim();
  if (trimmed) {
    router.push(`/search?query=${encodeURIComponent(trimmed)}`);
  } else {
    alert("Please enter a search query.");
  }
};

useHead({
  title: "BizFind - Discover Local Businesses",
  meta: [
    {
      name: "description",
      content:
        "Discover and connect with local businesses in your area with BizFind.",
    },
  ],
});
</script>

<style scoped>
.landing-page {
  font-family: Arial, sans-serif;
  color: #333;
}

/* Hero */
.hero {
  background: #fce7c0;
  color: navy;
  min-height: 25vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2em;
  text-align: center;
}

.hero-content {
  max-width: 600px;
  margin: 0 auto;
}

/* Search */
.search-section {
  text-align: center;
  padding: 2em;
}

.search-form {
  display: flex;
  justify-content: center;
  gap: 0.5em;
}

.search-form input {
  padding: 0.75em;
  border: 1px solid #ccc;
  border-radius: 5px;
  min-width: 300px;
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

.search-button:hover {
  background-color: #0056b3;
}
</style>
~/composables/useBusiness
