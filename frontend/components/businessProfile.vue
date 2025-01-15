<template>
  <div class="business-profile">
    <h1>{{ business.name }}</h1>
    <p>Category: {{ business.category }}</p>
    <p>Address: {{ business.address }}</p>
    <p>Phone: {{ business.phone }}</p>
    <p>Email: {{ business.email }}</p>
    <p>Website: <a :href="business.website" target="_blank">{{ business.website }}</a></p>
    <p>Description: {{ business.description }}</p>

    <h2>Operating Hours</h2>
    <ul>
      <li v-for="hour in business.operatingHours" :key="hour.day">
        {{ hour.day }}: {{ hour.open }} - {{ hour.close }}
      </li>
    </ul>

    <h2>Location</h2>
    <p>
      <a
        :href="getMapUrl(business.location.coordinates)"
        target="_blank"
      >
        View on Map
      </a>
    </p>

    <button @click="goToProducts">View Products</button>
  </div>
</template>

<script>
import { ref, reactive } from 'vue';
import { useRouter, useRoute } from 'vue-router';

export default {
  setup() {
    const router = useRouter();
    const route = useRoute();
    const business = ref({});

    async function fetchBusinessDetails() {
      try {
        const response = await fetch(`/api/businesses/${route.params.id}`);
        business.value = await response.json();
      } catch (error) {
        console.error('Error fetching business details:', error);
        business.value = {};
      }
    }

    function getMapUrl([longitude, latitude]) {
      // Construct the HERE Maps URL with the coordinates
      return `https://wego.here.com/?map=${latitude},${longitude},14`;
    }

    function goToProducts() {
      router.push(`/products/${business.value._id}`);
    }

    fetchBusinessDetails();

    return {
      business,
      getMapUrl,
      goToProducts,
    };
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
  color: #007BFF;
  text-decoration: none;
}

.business-profile a:hover {
  text-decoration: underline;
}

button {
  margin-top: 1em;
  padding: 0.5em 1em;
  background-color: #007BFF;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>
