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
        <input
          type="number"
          v-model="business.location.coordinates[1]"
          required
        />
      </label>
      <label>
        Longitude:
        <input
          type="number"
          v-model="business.location.coordinates[0]"
          required
        />
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
import { ref } from "vue";
import { useRouter } from "vue-router";

interface Location {
  type: string;
  coordinates: [number, number];
}

interface Business {
  name: string;
  address: string;
  phone: string;
  email: string;
  password: string;
  website: string;
  category: string;
  location: Location;
  description: string;
}

const business = ref<Business>({
  name: "",
  address: "",
  phone: "",
  email: "",
  password: "",
  website: "",
  category: "",
  location: {
    type: "Point",
    coordinates: [0, 0],
  },
  description: "",
});

const router = useRouter();

const registerBusiness = async (): Promise<void> => {
  try {
    const response = await fetch("/api/business/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(business.value),
    });
    alert("Business registered successfully");
    router.push("/login");
  } catch (error) {
    console.error("Registration failed:", error);
    alert("Registration failed");
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
