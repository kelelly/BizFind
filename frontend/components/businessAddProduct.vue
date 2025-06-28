<template>
  <div class="product-form">
    <h2>{{ isEditMode ? "Edit Product" : "Add a New Product" }}</h2>
    <form @submit.prevent="handleSubmit">
      <label>
        Product Name:
        <input type="text" v-model="product.name" required />
      </label>
      <label>
        Description:
        <textarea v-model="product.description" required></textarea>
      </label>
      <label>
        Category:
        <select v-model="product.category" required>
          <option value="" disabled>Select Category</option>
          <option value="Groceries">Groceries</option>
          <option value="Foodstuffs">Foodstuffs</option>
          <option value="Health and Personal Care">
            Health and Personal Care
          </option>
          <option value="Home and Household Essentials">
            Home and Household Essentials
          </option>
          <option value="Electronics and Entertainment">
            Electronics and Entertainment
          </option>
          <option value="Clothing and Accessories">
            Clothing and Accessories
          </option>
          <option value="Miscellaneous">Miscellaneous</option>
        </select>
      </label>
      <label>
        Price:
        <input type="number" v-model="product.price" min="0" required />
      </label>
      <label>
        Quantity:
        <input type="number" v-model="product.quantity" min="0" required />
      </label>
      <label>
        Image URL:
        <input type="text" v-model="product.imageUrl" />
      </label>
      <button type="submit">
        {{ isEditMode ? "Update Product" : "Add Product" }}
      </button>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";

interface Product {
  name: string;
  description: string;
  category: string;
  price: number;
  quantity: number;
  imageUrl: string;
  businessId: string;
}

const router = useRouter();
const route = useRoute();

const isEditMode = ref(false);

const product = reactive<Product>({
  name: "",
  description: "",
  category: "",
  price: 0,
  quantity: 0,
  imageUrl: "",
  businessId: String(route.params.businessId || ""),
});

async function fetchProductDetails(productId: string) {
  try {
    const response = await fetch(`/api/products/${productId}`);
    if (!response.ok) throw new Error("Failed to fetch product");
    const data = await response.json();
    Object.assign(product, data);
  } catch (error) {
    console.error("Error fetching product details:", error);
  }
}

async function handleSubmit() {
  try {
    const url = isEditMode.value
      ? `/api/products/${route.params.productId}`
      : "/api/products";
    const method = isEditMode.value ? "PUT" : "POST";

    const response = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    });

    if (!response.ok) throw new Error("Failed to save product");

    alert(
      isEditMode.value
        ? "Product updated successfully!"
        : "Product added successfully!"
    );
    router.push({
      name: "BusinessProfile",
      params: { id: product.businessId },
    });
  } catch (error) {
    console.error("Error saving product:", error);
    alert("Failed to save product. Please try again.");
  }
}

onMounted(() => {
  const productId = route.params.productId as string | undefined;
  if (productId) {
    isEditMode.value = true;
    fetchProductDetails(productId);
  }
});
</script>

<style scoped>
.product-form {
  max-width: 600px;
  margin: 0 auto;
  padding: 1em;
}

.product-form h2 {
  margin-bottom: 1em;
}

.product-form form {
  display: flex;
  flex-direction: column;
}

.product-form form label {
  margin-bottom: 0.5em;
}

.product-form form input,
.product-form form textarea,
.product-form form select {
  margin-bottom: 1em;
  padding: 0.5em;
  border: 1px solid #ccc;
  border-radius: 4px;
}
</style>
