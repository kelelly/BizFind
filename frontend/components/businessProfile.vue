<template>
  <div class="business-profile">
    <h1>{{ business.name }}</h1>
    <p>Category: {{ business.category }}</p>
    <p>Address: {{ business.address }}</p>
    <p>Phone: {{ business.phone }}</p>
    <p>Email: {{ business.email }}</p>
    <p>
      Website:
      <a :href="business.website" target="_blank">{{ business.website }}</a>
    </p>
    <p>Description: {{ business.description }}</p>

    <h2>Operating Hours</h2>
    <ul>
      <li v-for="hour in business.operatingHours" :key="hour.day">
        {{ hour.day }}: {{ hour.open }} - {{ hour.close }}
      </li>
    </ul>

    <h2>Location</h2>
    <p>
      <a :href="getMapUrl(business.location.coordinates)" target="_blank">
        View on Map
      </a>
    </p>

    <button @click="goToProducts">View Products</button>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";

interface OperatingHour {
  day: string;
  open: string;
  close: string;
}

interface Location {
  coordinates: [number, number]; // [longitude, latitude]
}

interface Business {
  _id: string;
  name: string;
  category: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  description: string;
  operatingHours: OperatingHour[];
  location: Location;
}

const route = useRoute();
const router = useRouter();

// Dynamically construct the API endpoint using the route parameter
const { data: business, error } = await useFetch<Business>(
  () => `/api/businesses/${route.params.id}`
);

// Function to generate the HERE Maps URL
const getMapUrl = (coordinates: [number, number]) => {
  const [longitude, latitude] = coordinates;
  return `https://wego.here.com/?map=${latitude},${longitude},14`;
};

// Navigate to the products page for the business
const goToProducts = () => {
  if (business.value?._id) {
    router.push(`/products/${business.value._id}`);
  }
};
</script>

<style scoped>
.business-profile {
  padding: 1em;
}

.business-profile h1 {
  margin-top: 0;
}

.business-profile ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.business-profile li {
  margin: 0.5em 0;
}

.business-profile p {
  margin: 0.5em 0;
}

.business-profile a {
  color: #007bff;
  text-decoration: none;
}

.business-profile a:hover {
  text-decoration: underline;
}

button {
  margin-top: 1em;
  padding: 0.5em 1em;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>
