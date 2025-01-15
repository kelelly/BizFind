<template>
  <div>
    <ProductDetails />
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import ProductDetails from '~/components/ProductDetails.vue';

export const ProductPage = defineComponent({
  components: {
    ProductDetails
  }
});
</script>

<style scoped>
/* Add any page-specific styles here */
</style>
