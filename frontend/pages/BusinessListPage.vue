<template>
  <div>
    <h1>Business List Page</h1>
    <BusinessList />
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import BusinessList from '@/components/businessList.vue';

export default defineComponent({
  components: { BusinessList }
});
</script>

<style scoped>
/* Add any styles specific to businessListPage here */
</style>
