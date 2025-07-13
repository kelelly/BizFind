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

  <div v-else-if="loading">
    <p>Loading product details...</p>
  </div>

  <div v-else>
    <p>Product not found.</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useProductData } from "@/composables/useProductData";

interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  quantity: number;
  imageUrl?: string;
  businessId: string;
}

const product = ref<Product | null>(null);
const loading = ref(true);

const route = useRoute();
const { getProductById } = useProductData();

const fetchProductDetails = async () => {
  const productId = route.params.id as string;

  const { data, error } = await getProductById(productId);

  if (error) {
    console.error("Error fetching product:", error.message);
  } else {
    product.value = data;
  }

  loading.value = false;
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
~/composables/useProducts
