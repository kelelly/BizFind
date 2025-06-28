<template>
  <div class="map-container">
    <div id="map" class="map"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useApi } from "~/composables/useApi";
import type { Business } from "~/types/business"; // Add types for business data

const { fetch } = useApi();
const businesses = ref<Business[]>([]);
const map = ref<H.Map | null>(null);

// Fetch businesses when the component is mounted
onMounted(async () => {
  try {
    const response = await fetch<{ businesses: Business[] }>("/businesses");
    businesses.value = response.data.businesses;
    initMap();
  } catch (error) {
    console.error("Error fetching businesses:", error);
    businesses.value = [];
  }
});

// Initialize the map using the HERE Maps API
const initMap = () => {
  const platform = new H.service.Platform({
    apikey: process.env.HERE_API_KEY, // Ensure you have the API key set in your environment
  });
  const defaultLayers = platform.createDefaultLayers();
  const mapContainer = document.getElementById("map");
  map.value = new H.Map(mapContainer, defaultLayers.vector.normal.map, {
    zoom: 12,
    center: { lat: 52.53086, lng: 13.38474 }, // Default center (Berlin) - adjust as needed
  });

  const behavior = new H.mapevents.Behavior(
    new H.mapevents.MapEvents(map.value)
  );
  const ui = H.ui.UI.createDefault(map.value, defaultLayers);

  addMarkersToMap(map.value);
};

// Add markers to the map for each business
const addMarkersToMap = (map: H.Map) => {
  const icon = new H.map.Icon("/path/to/marker-icon.png");
  const group = new H.map.Group();

  businesses.value.forEach((business) => {
    const position = {
      lat: business.location.coordinates[1],
      lng: business.location.coordinates[0],
    };
    const isOpen = checkIfOpen(business.operatingHours);
    const marker = new H.map.Marker(position, { icon: icon });

    marker.setData(`
      <div>
        <h3>${business.name}</h3>
        <p>Category: ${business.category}</p>
        <p>Phone: ${business.phone}</p>
        <p>Email: ${business.email}</p>
        <p>Status: ${isOpen ? "Open Now" : "Closed Now"}</p>
        <a href="/business/${business._id}" target="_blank">View Details</a>
      </div>
    `);

    group.addObject(marker);
  });

  map.addObject(group);

  map.addEventListener("tap", (event: any) => {
    const target = event.target;
    if (target instanceof H.map.Marker) {
      const bubble = new H.ui.InfoBubble(target.getPosition(), {
        content: target.getData(),
      });
      ui.addBubble(bubble);
    }
  });
};

// Check if the business is currently open based on operating hours
const checkIfOpen = (operatingHours: any[]) => {
  const now = new Date();
  const day = now.toLocaleDateString("en-US", { weekday: "long" });
  const time = now.toTimeString().slice(0, 5);

  const hours = operatingHours.find((hour) => hour.day === day);
  if (hours) {
    return time >= hours.open && time <= hours.close;
  }
  return false;
};
</script>

<style scoped>
.map-container {
  height: 100vh;
  width: 100%;
}

.map {
  height: 100%;
  width: 100%;
}
</style>
