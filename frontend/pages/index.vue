<template>
  <div class="container py-8">
    <h1 class="text-4xl font-bold mb-6">Welcome to BizFind</h1>

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
  </div>
</template>

<script setup lang="ts">
import BusinessCard from "@/components/BusinessCard.vue";

interface Feature {
  title: string;
  description: string;
}

interface Business {
  id: string;
  name: string;
  description: string;
  category: string;
  location: string;
  rating: number;
}

const features: Feature[] = [
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

const { data: businesses } = useFetch<Business[]>("/api/businesses");

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
