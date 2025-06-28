<template>
  <div>
    <!-- Filters Section -->
    <div class="filters">
      <input
        v-model="filter.location"
        type="text"
        placeholder="Filter by location"
      />
      <select v-model="filter.category">
        <option value="">All Categories</option>
        <option value="Grocery Store">Grocery Store</option>
        <option value="Supermarkets">Supermarkets</option>
        <option value="General Stores">General Stores</option>
      </select>
      <input
        v-model.number="filter.reviews"
        type="number"
        placeholder="Min Reviews"
        min="0"
        max="5"
      />
    </div>

    <!-- No Businesses Message -->
    <div v-if="filteredBusinesses.length === 0" class="no-businesses">
      No Businesses Displayed!
    </div>

    <!-- Business Cards -->
    <div class="business-cards">
      <div
        v-for="business in filteredBusinesses"
        :key="business._id"
        class="business-card"
      >
        <h2>{{ business.name }}</h2>
        <p>Category: {{ business.category }}</p>
        <p>Operating Hours:</p>
        <ul>
          <li v-for="hour in business.operatingHours" :key="hour.day">
            {{ hour.day }}: {{ hour.open }} - {{ hour.close }}
          </li>
        </ul>
        <p>Contact:</p>
        <p>Phone: {{ business.contact.phone }}</p>
        <p>Email: {{ business.contact.email }}</p>
        <div class="card-actions">
          <button @click="viewBusiness(business._id)">View Details</button>
          <button @click="viewFullProfile(business._id)">
            Full Business Profile
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, computed } from "vue";
import { useRouter } from "vue-router";

interface OperatingHour {
  day: string;
  open: string;
  close: string;
}

interface Contact {
  phone: string;
  email: string;
}

interface Business {
  _id: string;
  name: string;
  category: string;
  location: string;
  operatingHours: OperatingHour[];
  contact: Contact;
  reviews: number;
}

interface Filter {
  location: string;
  category: string;
  reviews: number | "";
}

const router = useRouter();
const filter = reactive<Filter>({
  location: "",
  category: "",
  reviews: "",
});

// Fetch businesses using Nuxt's useFetch
const { data: businesses, error } = await useFetch<Business[]>(
  "/api/businesses"
);

// Filtered businesses
const filteredBusinesses = computed(() => {
  if (!businesses.value) return [];
  return businesses.value.filter((business) => {
    const matchesLocation =
      !filter.location ||
      business.location.toLowerCase().includes(filter.location.toLowerCase());
    const matchesCategory =
      !filter.category || business.category === filter.category;
    const matchesReviews =
      filter.reviews === "" ||
      (business.reviews >= Number(filter.reviews) && business.reviews <= 5);
    return matchesLocation && matchesCategory && matchesReviews;
  });
});

// Navigation functions
const viewBusiness = (id: string) => {
  router.push(`/business/${id}`);
};

const viewFullProfile = (id: string) => {
  router.push(`/businessProfile/${id}`);
};
</script>

<style scoped>
.filters {
  display: flex;
  gap: 1em;
  margin-bottom: 1em;
}

.filters input,
.filters select {
  padding: 0.5em;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.no-businesses {
  margin: 1em 0;
  font-weight: bold;
  color: #777;
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

.business-card h2 {
  margin-top: 0;
}

.business-card ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.business-card li {
  margin: 0;
}

.business-card p {
  margin: 0.5em 0;
}

.card-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 1em;
}
</style>
