<template>
  <div class="page-container">
    <BusinessProfile />
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import BusinessProfile from '~/components/businessProfile.vue';

export default defineComponent({
  components: { BusinessProfile }
});
</script>

<style scoped>
.page-container {
  padding: 2em;
  background-color: #f8f9fa;
}
</style>
