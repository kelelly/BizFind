<template>
  <div>
    <BusinessRegister />
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from "vue";

const BusinessRegister = defineAsyncComponent(
  () => import("~/components/businessCreateAccount.vue")
);
</script>

<style scoped>
/* Add any page-specific styles here */
</style>
