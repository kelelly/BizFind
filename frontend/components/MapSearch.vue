<template>
  <div class="map-search">
    <div class="search-controls">
      <input v-model="searchQuery" placeholder="Search by name or category" />
      <select v-model="selectedCategory">
        <option value="">All Categories</option>
        <option
          v-for="category in categories"
          :key="category"
          :value="category"
        >
          {{ category }}
        </option>
      </select>
      <select v-model="selectedStatus">
        <option value="">All</option>
        <option value="open">Open Now</option>
        <option value="closed">Closed</option>
      </select>
      <input type="number" v-model.number="radius" placeholder="Radius (km)" />
    </div>

    <div class="map-container">
      <div id="map" class="map"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { createClient } from "@supabase/supabase-js";
import type { Business } from "~/types";

const supabaseUrl = useRuntimeConfig().public.supabaseUrl;
const supabaseKey = useRuntimeConfig().public.supabaseKey;
const supabase = createClient(supabaseUrl, supabaseKey);

const router = useRouter();
const businesses = ref<Business[]>([]);
const searchQuery = ref("");
const selectedCategory = ref("");
const selectedStatus = ref<"" | "open" | "closed">("");
const radius = ref(10);
const defaultCenter = { lat: -1.2921, lng: 36.8219 }; // Nairobi
const zoom = 12;

// Fetch businesses from Supabase
onMounted(async () => {
  const { data, error } = await supabase.from("businesses").select("*");
  if (data) {
    businesses.value = data.map((b) => ({
      ...b,
      openNow: checkIfOpen(b.operatingHours),
    }));
    initMap();
  } else {
    console.error("Error fetching businesses:", error);
  }
});

const categories = computed(() => [
  ...new Set(businesses.value.map((b) => b.category)),
]);

function calculateDistance(lat: number, lng: number): number {
  const R = 6371;
  const dLat = ((lat - defaultCenter.lat) * Math.PI) / 180;
  const dLng = ((lng - defaultCenter.lng) * Math.PI) / 180;
  const a =
    0.5 -
    Math.cos(dLat) / 2 +
    (Math.cos((defaultCenter.lat * Math.PI) / 180) *
      Math.cos((lat * Math.PI) / 180) *
      (1 - Math.cos(dLng))) /
      2;
  return R * 2 * Math.asin(Math.sqrt(a));
}

const filteredBusinesses = computed(() =>
  businesses.value.filter((b) => {
    const matchesQuery =
      b.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      b.category.toLowerCase().includes(searchQuery.value.toLowerCase());

    const matchesCategory =
      !selectedCategory.value || b.category === selectedCategory.value;

    const matchesStatus =
      !selectedStatus.value ||
      (selectedStatus.value === "open" ? b.openNow : !b.openNow);

    const matchesDistance =
      radius.value >= 0
        ? calculateDistance(
            b.location.coordinates[1],
            b.location.coordinates[0]
          ) <= radius.value
        : true;

    return matchesQuery && matchesCategory && matchesStatus && matchesDistance;
  })
);

const navigateTo = (business: Business) => {
  const destination = `geo!${business.location.coordinates[1]},${business.location.coordinates[0]}`;
  const mapLink = `https://www.here.com/route/car/geo!${defaultCenter.lat},${defaultCenter.lng}/${destination}?map=${business.location.coordinates[1]},${business.location.coordinates[0]},14,normal`;
  window.open(mapLink, "_blank");
};

function checkIfOpen(operatingHours: any[]): boolean {
  const now = new Date();
  const day = now.toLocaleDateString("en-US", { weekday: "long" });
  const time = now.toTimeString().slice(0, 5);
  const today = operatingHours?.find((h) => h.day === day);
  return today ? time >= today.open && time <= today.close : false;
}

function initMap() {
  const platform = new H.service.Platform({ apikey: process.env.HERE_API_KEY });
  const defaultLayers = platform.createDefaultLayers();
  const map = new H.Map(
    document.getElementById("map") as HTMLElement,
    defaultLayers.vector.normal.map,
    {
      zoom,
      center: defaultCenter,
    }
  );

  const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));
  const ui = H.ui.UI.createDefault(map, defaultLayers);
  const group = new H.map.Group();

  filteredBusinesses.value.forEach((b) => {
    const marker = new H.map.Marker({
      lat: b.location.coordinates[1],
      lng: b.location.coordinates[0],
    });

    marker.setData(`
      <div>
        <h3>${b.name}</h3>
        <p>Category: ${b.category}</p>
        <p>Status: ${b.openNow ? "Open Now" : "Closed"}</p>
        <p><strong>Address:</strong> ${b.address}</p>
        <button onclick="window.open('/business/${b._id}')">View</button>
      </div>
    `);

    group.addObject(marker);
  });

  map.addObject(group);
  map.addEventListener("tap", (evt: any) => {
    const target = evt.target;
    if (target instanceof H.map.Marker) {
      const bubble = new H.ui.InfoBubble(target.getGeometry(), {
        content: target.getData(),
      });
      ui.addBubble(bubble);
    }
  });
}
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

#map {
  width: 100%;
  height: 100%;
}
</style>
