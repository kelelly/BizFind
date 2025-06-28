<template>
  <div class="map-search">
    <div class="search-controls">
      <input v-model="searchQuery" placeholder="Search by name or category" />
      <select v-model="selectedCategory">
        <option value="">All Categories</option>
        <option
          v-for="category in categories"
          :key="category"
          :value="category"
        >
          {{ category }}
        </option>
      </select>
      <select v-model="selectedStatus">
        <option value="">All</option>
        <option value="open">Open Now</option>
        <option value="closed">Closed</option>
      </select>
      <input type="number" v-model.number="radius" placeholder="Radius (km)" />
    </div>

    <div class="map-container">
      <here-map :center="defaultCenter" :zoom="zoom" style="height: 500px">
        <here-marker
          v-for="business in filteredBusinesses"
          :key="business._id"
          :lat="business.location.coordinates[1]"
          :lng="business.location.coordinates[0]"
          :open="business.openNow"
        >
          <div class="info-window">
            <h3>{{ business.name }}</h3>
            <p>Category: {{ business.category }}</p>
            <p>{{ business.openNow ? "Open Now" : "Closed" }}</p>
            <p><strong>Address:</strong> {{ business.address }}</p>
            <button @click="navigateTo(business)">Get Directions</button>
          </div>
        </here-marker>
      </here-map>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useFetch } from "#app";
import { useRouter } from "vue-router";
import type { Business } from "~/types";

const router = useRouter();

const { data: businesses, error } = await useFetch<Business[]>(
  "/api/businesses"
);
const searchQuery = ref("");
const selectedCategory = ref("");
const selectedStatus = ref<"" | "open" | "closed">("");
const radius = ref(10);

const defaultCenter = { lat: 52.52, lng: 13.405 };
const zoom = 12;

// Dynamic categories from businesses
const categories = computed(() =>
  businesses.value ? [...new Set(businesses.value.map((b) => b.category))] : []
);

// Haversine formula for distance calculation
const calculateDistance = (lat: number, lng: number): number => {
  const R = 6371;
  const dLat = ((lat - defaultCenter.lat) * Math.PI) / 180;
  const dLng = ((lng - defaultCenter.lng) * Math.PI) / 180;
  const a =
    0.5 -
    Math.cos(dLat) / 2 +
    (Math.cos((defaultCenter.lat * Math.PI) / 180) *
      Math.cos((lat * Math.PI) / 180) *
      (1 - Math.cos(dLng))) /
      2;
  return R * 2 * Math.asin(Math.sqrt(a));
};

// Computed filtered businesses
const filteredBusinesses = computed(() =>
  businesses.value
    ? businesses.value.filter((business) => {
        const matchesQuery =
          business.name
            .toLowerCase()
            .includes(searchQuery.value.toLowerCase()) ||
          business.category
            .toLowerCase()
            .includes(searchQuery.value.toLowerCase());

        const matchesCategory = selectedCategory.value
          ? business.category === selectedCategory.value
          : true;

        const matchesStatus = selectedStatus.value
          ? selectedStatus.value === "open"
            ? business.openNow
            : !business.openNow
          : true;

        const matchesDistance =
          radius.value >= 0
            ? calculateDistance(
                business.location.coordinates[1],
                business.location.coordinates[0]
              ) <= radius.value
            : true;

        return (
          matchesQuery && matchesCategory && matchesStatus && matchesDistance
        );
      })
    : []
);

// Open Here map navigation link
const navigateTo = (business: Business) => {
  const destination = `geo!${business.location.coordinates[1]},${business.location.coordinates[0]}`;
  const mapLink = `https://www.here.com/route/car/geo!${defaultCenter.lat},${defaultCenter.lng}/${destination}?map=${business.location.coordinates[1]},${business.location.coordinates[0]},14,normal`;
  window.open(mapLink, "_blank");
};
</script>

<style scoped>
.map-search {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.search-controls {
  margin-bottom: 10px;
  display: flex;
  gap: 10px;
}

.map-container {
  width: 100%;
  height: 500px;
  position: relative;
}

.info-window {
  max-width: 200px;
  padding: 10px;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.info-window h3 {
  margin: 0 0 10px 0;
}

.info-window button {
  margin-top: 10px;
}
</style>
