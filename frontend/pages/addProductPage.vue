<template>
  <div class="page-container">
    <ProductForm />
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import ProductForm from '~/components/businessAddProduct.vue';

export default defineComponent({
  components: { ProductForm }
});
</script>

<style scoped>
.page-container {
  padding: 2em;
  background-color: #f8f9fa;
}
</style>
