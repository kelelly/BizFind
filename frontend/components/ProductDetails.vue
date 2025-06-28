<template>
  <div class="product-details" v-if="product">
    <h2>{{ product.name }}</h2>
    <img :src="product.imageUrl" alt="Product Image" v-if="product.imageUrl" />
    <p><strong>Description:</strong> {{ product.description }}</p>
    <p><strong>Category:</strong> {{ product.category }}</p>
    <p><strong>Price:</strong> ${{ product.price.toFixed(2) }}</p>
    <p><strong>Available Quantity:</strong> {{ product.quantity }}</p>
    <button @click="addToCart">Add to Cart</button>
  </div>
  <div v-else>
    <p>Loading product details...</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  quantity: number;
  imageUrl?: string;
}

const product = ref<Product | null>(null);
const route = useRoute();

const fetchProductDetails = async () => {
  try {
    const productId = route.params.id as string;
    const response = await fetch(`/api/products/${productId}`);
    if (!response.ok) throw new Error("Failed to fetch product details");
    product.value = await response.json();
  } catch (error) {
    console.error("Error fetching product details:", error);
  }
};

const addToCart = () => {
  if (product.value) {
    alert(`${product.value.name} has been added to your cart.`);
  }
};

onMounted(fetchProductDetails);
</script>

<style scoped>
.product-details {
  max-width: 600px;
  margin: 0 auto;
  padding: 1em;
  text-align: center;
}

.product-details img {
  max-width: 100%;
  height: auto;
  margin-bottom: 1em;
}

.product-details p {
  margin: 0.5em 0;
}

.product-details button {
  padding: 0.5em 1em;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.product-details button:hover {
  background-color: #0056b3;
}
</style>
