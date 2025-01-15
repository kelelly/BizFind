<template>
  <div class="map-container">
    <div id="map" class="map"></div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

let MapComponent = {
  setup() {
    const router = useRouter();
    const businesses = ref([]);
    const map = ref(null);

    onMounted(async () => {
      try {
        // Fetch all businesses from the API
        const response = await fetch('/api/businesses');
        const data = await response.json();
        businesses.value = data;
        initMap();
      } catch (error) {
        console.error('Error fetching businesses:', error);
        businesses.value = [];
      }
    });

    const initMap = () => {
      // Initialize the HERE Maps API
      const platform = new H.service.Platform({
        apikey: process.env.HERE_API_KEY // Ensure you have the API key set in your environment
      });
      const defaultLayers = platform.createDefaultLayers();
      const mapContainer = document.getElementById('map');
      map.value = new H.Map(
        mapContainer,
        defaultLayers.vector.normal.map,
        {
          zoom: 12,
          center: { lat: 52.53086, lng: 13.38474 } // Default center (Berlin) - adjust as needed
        }
      );
      
      // Add behavior and events to the map
      const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map.value));
      const ui = H.ui.UI.createDefault(map.value, defaultLayers);
      
      // Add markers for businesses
      addMarkersToMap(map.value);
    };

    const addMarkersToMap = (map) => {
      const icon = new H.map.Icon('/path/to/marker-icon.png'); // Path to your custom marker icon
      const group = new H.map.Group();

      businesses.value.forEach(business => {
        const position = { lat: business.location.coordinates[1], lng: business.location.coordinates[0] };
        const isOpen = checkIfOpen(business.operatingHours);
        const marker = new H.map.Marker(position, { icon: icon });
        
        marker.setData(`
          <div>
            <h3>${business.name}</h3>
            <p>Category: ${business.category}</p>
            <p>Phone: ${business.phone}</p>
            <p>Email: ${business.email}</p>
            <p>Status: ${isOpen? 'Open Now' : 'Closed Now'}</p>
            <a href="/business/${business._id}" target="_blank">View Details</a>
          </div>
        `);
        
        group.addObject(marker);
      });

      map.addObject(group);

      // Add event listener for info bubble
      map.addEventListener('tap', event => {
        const target = event.target;
        if (target instanceof H.map.Marker) {
          const bubble = new H.ui.InfoBubble(target.getPosition(), {
            content: target.getData()
          });
          ui.addBubble(bubble);
        }
      });
    };

    const checkIfOpen = (operatingHours) => {
      const now = new Date();
      const day = now.toLocaleDateString('en-US', { weekday: 'long' });
      const time = now.toTimeString().slice(0, 5); // Get current time in HH:MM format
      
      const hours = operatingHours.find(hour => hour.day === day);
      if (hours) {
        return time >= hours.open && time <= hours.close;
      }
      return false;
    };

    return {
      businesses,
      map,
      initMap,
      addMarkersToMap,
      checkIfOpen,
    };
  },
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
