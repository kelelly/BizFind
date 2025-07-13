<template>
  <div class="search-results">
    <h1>Search Results</h1>
    <p v-if="!results.length && !loading">
      No results found for "{{ query }}".
    </p>
    <p v-if="loading">Loading...</p>
    <div v-if="results.length" class="results-list">
      <div v-for="result in results" :key="result._id" class="result-item">
        <h2>{{ result.name }}</h2>
        <p>{{ result.description }}</p>
        <NuxtLink :to="`/business/${result._id}`">View Details</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useSupabase } from "@/composables/useSupabase";

interface SearchResult {
  id: string;
  name: string;
  description: string;
  // add any other fields you want
}

const supabase = useSupabase();

const router = useRouter();
const query = ref<string>("");
const results = ref<SearchResult[]>([]);
const loading = ref<boolean>(true);

const fetchResults = async (): Promise<void> => {
  loading.value = true;
  try {
    const { data, error } = await supabase
      .from("businesses")
      .select("*")
      .or(`name.ilike.%${query.value}%,description.ilike.%${query.value}%`);

    if (error) {
      console.error("Supabase error fetching search results:", error.message);
      results.value = [];
      return;
    }

    results.value = data || [];
  } catch (error) {
    console.error("Error fetching search results:", error);
    results.value = [];
  } finally {
    loading.value = false;
  }
};

// Watch the query parameter and refetch
watch(
  () => router.currentRoute.value.query.query,
  async (newQuery) => {
    query.value = typeof newQuery === "string" ? newQuery : "";
    await fetchResults();
  }
);

// Initial fetch if query param exists
onMounted(async () => {
  if (router.currentRoute.value.query.query) {
    query.value =
      typeof router.currentRoute.value.query.query === "string"
        ? router.currentRoute.value.query.query
        : "";
  }
  await fetchResults();
});
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
