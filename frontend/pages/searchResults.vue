<template>
  <div class="search-results">
    <h1>Search Results</h1>
    <p v-if="!results.length &&!loading">No results found for "{{ query }}".</p>
    <p v-if="loading">Loading...</p>
    <div v-if="results.length" class="results-list">
      <div v-for="result in results" :key="result._id" class="result-item">
        <h2>{{ result.name }}</h2>
        <p>{{ result.description }}</p>
        <nuxt-link :to="`/business/${result._id}`">View Details</nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';

export const SearchResults = {
  setup() {
    const router = useRouter();
    const query = ref('');
    const results = ref([]);
    const loading = ref(true);

    const fetchResults = async () => {
      loading.value = true;
      try {
        const response = await fetch('/api/search', {
          method: 'GET',
          params: { query: query.value }
        });
        results.value = await response.json();
      } catch (error) {
        console.error('Error fetching search results:', error);
        results.value = [];
      } finally {
        loading.value = false;
      }
    };

    watch(() => router.currentRoute.value.query.query, async (newQuery) => {
      query.value = newQuery || '';
      await fetchResults();
    });

    router.currentRoute.value.query.query && (query.value = router.currentRoute.value.query.query);
    fetchResults();

    return {
      query,
      results,
      loading,
      fetchResults,
    };
  },
};
</script>

<style scoped>
.search-results {
  padding: 2em;
  max-width: 800px;
  margin: 0 auto;
}

.results-list {
  display: flex;
  flex-direction: column;
  gap: 1em;
}

.result-item {
  border: 1px solid #ddd;
  padding: 1em;
  border-radius: 5px;
  background-color: #f9f9f9;
}

.result-item h2 {
  margin: 0 0 0.5em 0;
}

.result-item p {
  margin: 0.5em 0;
}

.result-item a {
  color: #007bff;
  text-decoration: none;
}

.result-item a:hover {
  text-decoration: underline;
}
</style>
