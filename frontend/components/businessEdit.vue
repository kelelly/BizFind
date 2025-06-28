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
          v-model="business.location"
          placeholder="e.g., 40.7128,-74.0060"
        />
      </label>
      <label>
        Operating Hours:
        <div v-for="(hour, index) in business.operatingHours" :key="index">
          <input type="text" v-model="hour.day" placeholder="Day" required />
          <input
            type="text"
            v-model="hour.open"
            placeholder="Open Time"
            required
          />
          <input
            type="text"
            v-model="hour.close"
            placeholder="Close Time"
            required
          />
          <button @click="removeOperatingHour(index)">Remove</button>
        </div>
        <button @click="addOperatingHour">Add Operating Hour</button>
      </label>
      <button type="submit">Update Profile</button>
    </form>
  </div>
</template>

<script lang="ts">
import { ref, reactive, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";

interface OperatingHour {
  day: string;
  open: string;
  close: string;
}

interface Business {
  _id?: string;
  name: string;
  category: string;
  phone: string;
  email: string;
  website: string;
  address: string;
  description: string;
  location: string;
  operatingHours: OperatingHour[];
}

export default {
  setup() {
    const router = useRouter();
    const route = useRoute();

    const business = reactive<Business>({
      name: "",
      category: "",
      phone: "",
      email: "",
      website: "",
      address: "",
      description: "",
      location: "",
      operatingHours: [],
    });

    const fetchBusinessDetails = async () => {
      try {
        const response = await fetch(`/api/business/${route.params.id}`);
        if (!response.ok) throw new Error("Failed to fetch business");
        const data = await response.json();
        Object.assign(business, data);
      } catch (error) {
        console.error("Error fetching business details:", error);
      }
    };

    const updateBusiness = async () => {
      try {
        const response = await fetch(`/api/business/${business._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(business),
        });

        if (!response.ok) throw new Error("Failed to update business");
        alert("Business profile updated successfully!");
        router.push({ name: "BusinessProfile", params: { id: business._id } });
      } catch (error) {
        console.error("Error updating business:", error);
        alert("Failed to update business profile. Please try again.");
      }
    };

    const addOperatingHour = () => {
      business.operatingHours.push({ day: "", open: "", close: "" });
    };

    const removeOperatingHour = (index: number) => {
      business.operatingHours.splice(index, 1);
    };

    onMounted(() => {
      fetchBusinessDetails();
    });

    return {
      business,
      updateBusiness,
      addOperatingHour,
      removeOperatingHour,
    };
  },
};
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
