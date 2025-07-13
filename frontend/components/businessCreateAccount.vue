<template>
  <div class="business-register">
    <h2>Create Business Account</h2>
    <form @submit.prevent="registerBusiness">
      <label>
        Name:
        <input type="text" v-model="business.name" required />
      </label>
      <label>
        Address:
        <input type="text" v-model="business.address" required />
      </label>
      <label>
        Phone:
        <input type="text" v-model="business.phone" required />
      </label>
      <label>
        Email:
        <input type="email" v-model="business.email" required />
      </label>
      <label>
        Password:
        <input type="password" v-model="business.password" required />
      </label>
      <label>
        Website:
        <input type="text" v-model="business.website" />
      </label>
      <label>
        Category:
        <select v-model="business.category" required>
          <option value="" disabled>Select Category</option>
          <option value="Grocery Store">Grocery Store</option>
          <option value="Supermarket">Supermarket</option>
          <option value="General Shop">General Shop</option>
        </select>
      </label>
      <label>
        Latitude:
        <input type="number" v-model="business.lat" step="any" required />
      </label>
      <label>
        Longitude:
        <input type="number" v-model="business.lng" step="any" required />
      </label>
      <label>
        Description:
        <textarea v-model="business.description"></textarea>
      </label>
      <button type="submit">Register</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { supabase } from "~/utils/supabase"; // adjust if your path is different

const router = useRouter();

interface Business {
  name: string;
  address: string;
  phone: string;
  email: string;
  password: string;
  website: string;
  category: string;
  description: string;
  lat: number;
  lng: number;
}

const business = ref<Business>({
  name: "",
  address: "",
  phone: "",
  email: "",
  password: "",
  website: "",
  category: "",
  description: "",
  lat: 0,
  lng: 0,
});

// Auto-fill location from browser geolocation
onMounted(() => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        business.value.lat = position.coords.latitude;
        business.value.lng = position.coords.longitude;
      },
      (error) => {
        console.warn("Geolocation error:", error.message);
      }
    );
  }
});

const registerBusiness = async () => {
  try {
    // 1. Sign up user
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: business.value.email,
      password: business.value.password,
    });

    if (authError) throw authError;

    const userId = authData.user?.id;
    if (!userId) throw new Error("User ID not returned");

    // 2. Construct POINT from lat/lng
    const locationWKT = `POINT(${business.value.lng} ${business.value.lat})`;

    // 3. Insert business row
    const { error: insertError } = await supabase.from("businesses").insert([
      {
        owner_id: userId,
        name: business.value.name,
        address: business.value.address,
        phone: business.value.phone,
        email: business.value.email,
        website: business.value.website,
        category: business.value.category,
        description: business.value.description,
        image_url: null, // you can adjust this if needed
        location: locationWKT,
      },
    ]);

    if (insertError) throw insertError;

    alert("Registration successful. Please check your email to confirm.");
    router.push("/login");
  } catch (error: any) {
    console.error("Registration failed:", error.message);
    alert("Registration failed: " + error.message);
  }
};
</script>

<style scoped>
.business-register {
  max-width: 600px;
  margin: 0 auto;
  padding: 2em;
  background-color: #ffffff;
  color: #1b1b1b;
}

.business-register h2 {
  margin-bottom: 1em;
}

.business-register form {
  display: flex;
  flex-direction: column;
}

.business-register form label {
  margin-bottom: 0.5em;
}

.business-register form input,
.business-register form select,
.business-register form textarea {
  margin-bottom: 1em;
  padding: 0.5em;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.business-register form button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 0.5em 1em;
  cursor: pointer;
  border-radius: 4px;
}

.business-register form button:hover {
  background-color: #0056b3;
}
</style>
