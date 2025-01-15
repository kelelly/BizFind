<template>
  <div class="page-container">
    <BusinessEdit />
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import BusinessEdit from '~/components/businessEdit.vue';

export default defineComponent({
  components: { BusinessEdit }
});
</script>

<style scoped>
.page-container {
  padding: 2em;
  background-color: #f8f9fa;
}
</style>
