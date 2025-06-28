<template>
  <div class="page-container">
    <BusinessEdit />
  </div>
</template>

<script setup lang="ts">
import BusinessEdit from "~/components/businessEdit.vue";

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
