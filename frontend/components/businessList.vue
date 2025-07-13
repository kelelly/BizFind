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
        :key="business.id"
        class="business-card"
      >
        <h2>{{ business.name }}</h2>
        <p>Category: {{ business.category }}</p>
        <p>Operating Hours:</p>
        <ul>
          <li v-for="hour in business.operating_hours" :key="hour.day">
            {{ hour.day }}: {{ hour.open }} - {{ hour.close }}
          </li>
        </ul>
        <p>Contact:</p>
        <p>Phone: {{ business.contact_phone }}</p>
        <p>Email: {{ business.contact_email }}</p>
        <div class="card-actions">
          <button @click="viewBusiness(business.id)">View Details</button>
          <button @click="viewFullProfile(business.id)">
            Full Business Profile
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useBusiness } from "~/composables/useBusiness";

interface OperatingHour {
  day: string;
  open: string;
  close: string;
}

interface Business {
  id: string;
  name: string;
  category: string;
  location: string;
  operating_hours: OperatingHour[];
  contact_phone: string;
  contact_email: string;
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

const businesses = ref<Business[]>([]);

const fetchBusinesses = async () => {
  const { data, error } = await supabase.from("businesses").select("*");

  if (error) {
    console.error("Error fetching businesses:", error);
  } else if (data) {
    businesses.value = data as Business[];
  }
};

onMounted(fetchBusinesses);

const filteredBusinesses = computed(() => {
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

const viewBusiness = (id: string) => {
  router.push(`/business/${id}`);
};

const viewFullProfile = (id: string) => {
  router.push(`/businessProfile/${id}`);
};
</script>

<style scoped>
/* (same as your original styles) */
</style>
