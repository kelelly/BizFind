<template>
  <div class="page-container">
    <ProductForm />
  </div>
</template>

<script setup lang="ts">
import ProductForm from "~/components/businessAddProduct.vue";

definePageMeta({
  middleware: ["auth", "business-owner"],
});
</script>

<style scoped>
.page-container {
  padding: 2em;
  background-color: #f8f9fa;
}
</style>
