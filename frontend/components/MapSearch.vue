<template>
  <div class="map-search">
    <div class="search-controls">
      <input v-model="searchQuery" placeholder="Search by name or category" @input="filterBusinesses" />
      <select v-model="selectedCategory" @change="filterBusinesses">
        <option value="">All Categories</option>
        <option value="Grocery Store">Grocery Store</option>
        <option value="Supermarket">Supermarket</option>
        <option value="General Shop">General Shop</option>
      </select>
      <select v-model="selectedStatus" @change="filterBusinesses">
        <option value="">All</option>
        <option value="open">Open Now</option>
        <option value="closed">Closed</option>
      </select>
      <input type="number" v-model.number="radius" placeholder="Radius (km)" @input="filterBusinesses" />
    </div>
    <div class="map-container">
      <here-map :center="{ lat: defaultCenter.lat, lng: defaultCenter.lng }" :zoom="zoom" style="height: 500px;">
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
            <p>{{ business.openNow ? 'Open Now' : 'Closed' }}</p>
            <p><strong>Address:</strong> {{ business.address }}</p>
            <button @click="navigateTo(business)">Get Directions</button>
          </div>
        </here-marker>
      </here-map>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import HereMap from 'vue-here-map';
import HereMarker from 'vue-here-map-marker';

export default {
  components: {
    HereMap,
    HereMarker,
  },
  setup() {
    const router = useRouter();
    const businesses = ref([]);
    const filteredBusinesses = ref([]);
    const searchQuery = ref('');
    const selectedCategory = ref('');
    const selectedStatus = ref('');
    const radius = ref(10);
    const defaultCenter = { lat: 52.52, lng: 13.405 };
    const zoom = ref(12);

    onMounted(async () => {
      try {
        const response = await fetch('/api/businesses');
        businesses.value = await response.json();
        filteredBusinesses.value = businesses.value;
      } catch (error) {
        console.error('Error fetching businesses:', error);
      }
    });

    const filterBusinesses = () => {
      filteredBusinesses.value = businesses.value.filter(business => {
        const matchesQuery = business.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
          business.category.toLowerCase().includes(searchQuery.value.toLowerCase());
        const matchesCategory = selectedCategory.value ? business.category === selectedCategory.value : true;
        const matchesStatus = selectedStatus.value
          ? selectedStatus.value === 'open'
            ? business.openNow
            : !business.openNow
          : true;
        const matchesDistance = radius.value
          ? calculateDistance(business.location.coordinates[1], business.location.coordinates[0]) <= radius.value
          : true;

        return matchesQuery && matchesCategory && matchesStatus && matchesDistance;
      });
    };

    const calculateDistance = (lat, lng) => {
      const R = 6371; // Radius of the Earth in km
      const dLat = (lat - defaultCenter.lat) * Math.PI / 180;
      const dLng = (lng - defaultCenter.lng) * Math.PI / 180;
      const a = 
        0.5 - Math.cos(dLat) / 2 +
        Math.cos(defaultCenter.lat * Math.PI / 180) * Math.cos(lat * Math.PI / 180) *
        (1 - Math.cos(dLng)) / 2;

      return R * 2 * Math.asin(Math.sqrt(a));
    };

    const navigateTo = (business) => {
      // Use HERE Maps API to get navigation directions
      const start = 'geo!52.52,13.405'; // Example start point (Berlin)
      const destination = `geo!${business.location.coordinates[1]},${business.location.coordinates[0]}`;

      window.open(
        `https://www.here.com/route/car/${start}/${destination}?map=${business.location.coordinates[1]},${business.location.coordinates[0]},14,normal`,
        '_blank'
      );
    };

    return {
      businesses,
      filteredBusinesses,
      searchQuery,
      selectedCategory,
      selectedStatus,
      radius,
      defaultCenter,
      zoom,
      filterBusinesses,
      navigateTo,
    };
  },
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
