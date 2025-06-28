<template>
  <div class="product-list">
    <div v-if="products.length === 0" class="no-products">
      No products found for this business.
    </div>
    <div v-else class="product-cards">
      <div v-for="product in products" :key="product._id" class="product-card">
        <h3>{{ product.name }}</h3>
        <p>Price: {{ product.price | currency }}</p>
        <button @click="viewProductDetails(product._id)">Show More</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

interface Product {
  _id: string;
  name: string;
  price: number;
}

const products = ref<Product[]>([]);
const router = useRouter();

const fetchProducts = async () => {
  try {
    const response = await fetch(
      `/api/products?businessId=${router.currentRoute.value.params.businessId}`
    );
    if (!response.ok) throw new Error("Failed to fetch products");
    products.value = await response.json();
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};

const viewProductDetails = (productId: string) => {
  router.push({ name: "ProductDetails", params: { id: productId } });
};

onMounted(fetchProducts);
</script>

<style scoped>
.product-list {
  max-width: 800px;
  margin: 0 auto;
  padding: 2em;
  background-color: #ffffff;
  color: #1b1b1b;
}

.no-products {
  text-align: center;
  font-size: 1.2em;
  color: #999;
}

.product-cards {
  display: flex;
  flex-wrap: wrap;
  gap: 1em;
}

.product-card {
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  padding: 1em;
  border-radius: 5px;
  width: calc(33% - 1em);
  box-sizing: border-box;
}

.product-card h3,
.product-card p {
  color: #1b1b1b;
}

.product-card h3 {
  margin: 0 0 0.5em 0;
}

.product-card p {
  margin: 0.5em 0;
}

.product-card button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 0.5em 1em;
  cursor: pointer;
  border-radius: 5px;
}

.product-card button:hover {
  background-color: #0056b3;
}
</style>
