<template>
  <div class="business-account">
    <div v-if="step === 'register'">
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
          <input type="number" v-model="business.location.coordinates[1]" required />
        </label>
        <label>
          Longitude:
          <input type="number" v-model="business.location.coordinates[0]" required />
        </label>
        <label>
          Description:
          <textarea v-model="business.description"></textarea>
        </label>
        <button type="submit">Register</button>
      </form>
    </div>

    <div v-else-if="step === 'forgotPassword'">
      <h2>Forgot Password</h2>
      <form @submit.prevent="forgotPassword">
        <label>
          Email:
          <input type="email" v-model="email" required />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>

    <div v-else-if="step === 'resetPassword'">
      <h2>Reset Password</h2>
      <form @submit.prevent="resetPassword">
        <label>
          New Password:
          <input type="password" v-model="newPassword" required />
        </label>
        <button type="submit">Reset</button>
      </form>
    </div>

    <div class="navigation-buttons">
      <button @click="step = 'register'">Create Account</button>
      <button @click="step = 'forgotPassword'">Forgot Password</button>
      <button @click="step = 'resetPassword'">Reset Password</button>
    </div>
  </div>
</template>

<script>
export default {
  setup() {
    const step = ref('register');
    const business = reactive({
      name: '',
      address: '',
      phone: '',
      email: '',
      password: '',
      website: '',
      category: '',
      location: {
        type: 'Point',
        coordinates: [0, 0], // [longitude, latitude]
      },
      description: '',
    });
    const email = ref('');
    const newPassword = ref('');

    async function registerBusiness() {
      try {
        const response = await fetch('/api/business/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(business),
        });
        alert('Business registered successfully');
      } catch (error) {
        console.error('Registration failed:', error);
        alert('Registration failed');
      }
    }

    async function forgotPassword() {
      try {
        await fetch('/api/business/forgot-password', {
         