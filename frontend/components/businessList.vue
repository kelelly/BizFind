<template>
  <div class="business-cards">
    <div v-for="business in filteredBusinesses" :key="business._id" class="business-card">
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
        <button @click="viewFullProfile(business._id)">Full Business Profile</button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, computed } from 'vue';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const router = useRouter();
    const businesses = ref([]);
    const filter = reactive({
      location: '',
      category: '',
      reviews: '',
    });

    async function fetchBusinesses() {
      try {
        const response = await fetch('/api/businesses');
        businesses.value = await response.json();
      } catch (error) {
        console.error('Error fetching businesses:', error);
        businesses.value = [];
      }
    }

    const filteredBusinesses = computed(() => {
      return businesses.value.filter(business => {
        return (
          (!filter.location || business.location.includes(filter.location)) &&
          (!filter.category || business.category === filter.category) &&
          (!filter.reviews || business.reviews >= filter.reviews)
        );
      });
    });

    function viewBusiness(id) {
      router.push(`/business/${id}`);
    }

    function viewFullProfile(id) {
      router.push(`/businessProfile/${id}`);
    }

    fetchBusinesses();

    return {
      filter,
      businesses,
      filteredBusinesses,
      viewBusiness,
      viewFullProfile,
    };
  }
};
</script>

<style scoped>
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
