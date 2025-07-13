<template>
  <div class="business-profile" v-if="business">
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
      <li v-for="hour in business.operating_hours" :key="hour.day">
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

  <div v-else>
    <p>Loading business details...</p>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { useSupabase } from "~/composables/useSupabase";
import { ref, onMounted } from "vue";

interface OperatingHour {
  day: string;
  open: string;
  close: string;
}

interface Location {
  coordinates: [number, number];
}

interface Business {
  id: string;
  name: string;
  category: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  description: string;
  operating_hours: OperatingHour[];
  location: Location;
}

const route = useRoute();
const router = useRouter();
const supabase = useSupabase();

const business = ref<Business | null>(null);

const fetchBusiness = async () => {
  const { data, error } = await supabase
    .from("businesses")
    .select("*")
    .eq("id", route.params.id)
    .single();

  if (error) {
    console.error("Error loading business:", error.message);
  } else {
    business.value = data as Business;
  }
};

const getMapUrl = (coordinates: [number, number]) => {
  const [longitude, latitude] = coordinates;
  return `https://wego.here.com/?map=${latitude},${longitude},14`;
};

const goToProducts = () => {
  if (business.value?.id) {
    router.push(`/products/${business.value.id}`);
  }
};

onMounted(fetchBusiness);
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
