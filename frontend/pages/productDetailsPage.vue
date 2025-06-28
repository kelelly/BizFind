<template>
  <div>
    <ProductDetails />
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue'

const ProductDetails = defineAsyncComponent(() => import('~/components/ProductDetails.vue'))
</script>

<style scoped>
/* Add any page-specific styles here */
</style>
