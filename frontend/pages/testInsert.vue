<template>
  <div>
    <p v-if="errorMessage" style="color: red">{{ errorMessage }}</p>
    <p v-else-if="insertedData">✅ Business inserted: {{ insertedData }}</p>
    <p v-else>Waiting for insert...</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useBusiness } from "~/composables/useBusiness.js";

const insertedData = ref(null);
const errorMessage = ref(null);

onMounted(async () => {
  const { insertBusiness } = useBusiness();

  const newBusiness = {
    owner_id: "YOUR_PROFILE_ID_UUID",
    name: "My Test Business",
    address: "123 Main Street",
    phone: "123-456-7890",
    email: "info@example.com",
    website: "https://example.com",
    category: "Restaurant",
    latitude: -1.286389,
    longitude: 36.817223,
    description: "A great place to eat!",
    image_url: "https://example.com/image.jpg",
  };

  const { data, error } = await insertBusiness(newBusiness);

  if (error) {
    console.error("❌ Insert error:", error.message);
    errorMessage.value = error.message;
  } else {
    console.log("✅ Business inserted:", data);
    insertedData.value = JSON.stringify(data);
  }
});
</script>
