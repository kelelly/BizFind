<template>
  <div class="product-form">
    <h2>{{ isEditMode? 'Edit Product' : 'Add a New Product' }}</h2>
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
          <option value="Health and Personal Care">Health and Personal Care</option>
          <option value="Home and Household Essentials">Home and Household Essentials</option>
          <option value="Electronics and Entertainment">Electronics and Entertainment</option>
          <option value="Clothing and Accessories">Clothing and Accessories</option>
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
      <button type="submit">{{ isEditMode? 'Update Product' : 'Add Product' }}</button>
    </form>
  </div>
</template>

<script>
export default {
  setup() {
    const router = useRouter();
    const route = useRoute();
    const product = reactive({
      name: '',
      description: '',
      category: '',
      price: 0,
      quantity: 0,
      imageUrl: '',
      businessId: route.params.businessId || '',
    });
    const isEditMode = ref(false);

    async function fetchProductDetails(productId) {
      try {
        const response = await fetch(`/api/products/${productId}`);
        const data = await response.json();
        Object.assign(product, data);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    }

    async function handleSubmit() {
      try {
        if (isEditMode.value) {
          await fetch(`/api/products/${route.params.productId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(product),
          });
          alert('Product updated successfully!');
        } else {
          await fetch('/api/products', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(product),
          });
          alert('Product added successfully!');
        }
        router.push({ name: 'BusinessProfile', params: { id: product.businessId } });
      } catch (error) {
        console.error('Error saving product:', error);
        alert('Failed to save product. Please try again.');
      }
    }

    onMounted(() => {
      if (route.params.productId) {
        isEditMode.value = true;
        fetchProductDetails(route.params.productId);
      }
    });

    return {
      product,
      isEditMode,
      handleSubmit,
    };
  },
};
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
