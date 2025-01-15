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

<script>
let ProductDetails = {
  setup() {
    let product = ref(null);

    onMounted(async () => {
      try {
        const productId = useRouter().currentRoute.value.params.id;
        const response = await fetch(`/api/products/${productId}`);
        product.value = await response.json();
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    });

    const addToCart = () => {
      // Logic to add the product to the user's cart
      alert(`${product.value.name} has been added to your cart.`);
    };

    return {
      product,
      addToCart,
    };
  },
};
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
