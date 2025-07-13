<template>
  <div class="map-container">
    <div id="map" class="map"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useSupabaseClient } from "@supabase/auth-helpers-nuxt";
import type { Business } from "~/types/business";
import { useRuntimeConfig } from "#imports";

const supabase = useSupabaseClient();
const config = useRuntimeConfig();
const businesses = ref<Business[]>([]);
const map = ref<H.Map | null>(null);
let ui: H.ui.UI | null = null;

// Initialize HERE map and markers
onMounted(async () => {
  await fetchBusinesses();
  initMap();
});

const fetchBusinesses = async () => {
  const { data, error } = await supabase.from("businesses").select("*");

  if (error) {
    console.error("Supabase error:", error);
    return;
  }

  businesses.value = (data as Business[]).filter(
    (b) => b.location?.coordinates
  );
};

const initMap = () => {
  const platform = new H.service.Platform({
    apikey: config.public.hereApiKey,
  });

  const defaultLayers = platform.createDefaultLayers();
  const mapElement = document.getElementById("map")!;

  map.value = new H.Map(mapElement, defaultLayers.vector.normal.map, {
    zoom: 12,
    center: { lat: -1.286389, lng: 36.817223 }, // Nairobi center
  });

  // Add interaction & UI
  new H.mapevents.Behavior(new H.mapevents.MapEvents(map.value));
  ui = H.ui.UI.createDefault(map.value, defaultLayers);

  addMarkersToMap();
};

const addMarkersToMap = () => {
  const icon = new H.map.Icon("/images/marker-icon.png"); // Customize if needed
  const group = new H.map.Group();

  businesses.value.forEach((business) => {
    const coords = business.location?.coordinates;
    if (!coords || coords.length < 2) return;

    const position = { lat: coords[1], lng: coords[0] };
    const marker = new H.map.Marker(position, { icon });

    const isOpen = checkIfOpen(business.operatingHours);
    const popup = `
      <div style="width: 200px">
        <strong>${business.name}</strong>
        <p>Category: ${business.category}</p>
        <p>Phone: ${business.phone}</p>
        <p>Email: ${business.email}</p>
        <p>Status: <b>${isOpen ? "Open" : "Closed"}</b></p>
        <a href="/business/${business.id}" target="_blank">View Details</a>
      </div>
    `;

    marker.setData(popup);
    group.addObject(marker);
  });

  map.value?.addObject(group);

  // Tap interaction
  map.value?.addEventListener("tap", (evt: any) => {
    const target = evt.target;
    if (target instanceof H.map.Marker && ui) {
      const bubble = new H.ui.InfoBubble(target.getGeometry(), {
        content: target.getData(),
      });
      ui.addBubble(bubble);
    }
  });
};

// Helper: Check open/closed status
const checkIfOpen = (operatingHours: any[]) => {
  const now = new Date();
  const currentDay = now.toLocaleDateString("en-US", { weekday: "long" });
  const currentTime = now.toTimeString().slice(0, 5);

  const today = operatingHours?.find((h) => h.day === currentDay);
  if (!today) return false;

  return currentTime >= today.open && currentTime <= today.close;
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
