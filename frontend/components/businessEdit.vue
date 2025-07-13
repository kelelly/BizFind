<template>
  <div class="business-edit">
    <h1>Edit Business Profile</h1>
    <form @submit.prevent="updateBusiness">
      <label>
        Name:
        <input type="text" v-model="business.name" required />
      </label>
      <label>
        Category:
        <input type="text" v-model="business.category" required />
      </label>
      <label>
        Phone:
        <input type="tel" v-model="business.phone" required />
      </label>
      <label>
        Email:
        <input type="email" v-model="business.email" required />
      </label>
      <label>
        Website:
        <input type="url" v-model="business.website" />
      </label>
      <label>
        Address:
        <input type="text" v-model="business.address" required />
      </label>
      <label>
        Description:
        <textarea v-model="business.description"></textarea>
      </label>
      <label>
        Location (latitude, longitude):
        <input
          type="text"
          v-model="locationInput"
          placeholder="e.g., 40.7128,-74.0060"
          required
        />
      </label>
      <label>
        Operating Hours:
        <div v-for="(hour, index) in business.operating_hours" :key="index">
          <input v-model="hour.day" placeholder="Day" required />
          <input v-model="hour.open" placeholder="Open Time" required />
          <input v-model="hour.close" placeholder="Close Time" required />
          <button @click.prevent="removeOperatingHour(index)">Remove</button>
        </div>
        <button @click.prevent="addOperatingHour">Add Operating Hour</button>
      </label>
      <button type="submit">Update Profile</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useBusiness } from "~/composables/useBusiness";

const route = useRoute();
const router = useRouter();
const { $toast } = useNuxtApp();

const business = reactive({
  id: "",
  name: "",
  category: "",
  phone: "",
  email: "",
  website: "",
  address: "",
  description: "",
  location: {
    type: "Point",
    coordinates: [0, 0], // [lng, lat]
  },
  operating_hours: [] as Array<{ day: string; open: string; close: string }>,
});

const locationInput = ref(""); // bound to input as string "lat,lng"

const fetchBusinessDetails = async () => {
  const id = route.params.id as string;
  const { data, error } = await supabase
    .from("businesses")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    $toast.error("Failed to load business");
    return;
  }

  Object.assign(business, data);
  if (business.location?.coordinates?.length === 2) {
    locationInput.value = `${business.location.coordinates[1]},${business.location.coordinates[0]}`;
  }
};

const updateBusiness = async () => {
  const [lat, lng] = locationInput.value.split(",").map(Number);
  business.location = {
    type: "Point",
    coordinates: [lng, lat],
  };

  const { error } = await supabase
    .from("businesses")
    .update(business)
    .eq("id", business.id);

  if (error) {
    console.error(error);
    $toast.error("Failed to update business");
    return;
  }

  $toast.success("Business updated");
  router.push({ name: "BusinessProfile", params: { id: business.id } });
};

const addOperatingHour = () => {
  business.operating_hours.push({ day: "", open: "", close: "" });
};

const removeOperatingHour = (index: number) => {
  business.operating_hours.splice(index, 1);
};

onMounted(fetchBusinessDetails);
</script>

<style scoped>
.business-edit {
  max-width: 800px;
  margin: 0 auto;
  padding: 2em;
  background-color: #ffffff;
  color: #1b1b1b;
}
.business-edit h1 {
  margin-bottom: 1em;
}
.business-edit form {
  display: flex;
  flex-direction: column;
}
.business-edit form label {
  margin-bottom: 0.5em;
}
.business-edit form input,
.business-edit form textarea {
  margin-bottom: 1em;
  padding: 0.5em;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.business-edit form button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 0.5em 1em;
  cursor: pointer;
  border-radius: 4px;
}
.business-edit form button:hover {
  background-color: #0056b3;
}
</style>
