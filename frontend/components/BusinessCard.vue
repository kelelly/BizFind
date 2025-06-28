<template>
  <div
    class="bg-white rounded-2xl shadow-md overflow-hidden transition hover:shadow-lg"
  >
    <div class="aspect-w-16 aspect-h-9 bg-gray-200">
      <img
        :src="business.image || '/images/placeholder-business.jpg'"
        :alt="business.name || 'Business Image'"
        class="object-cover w-full h-full"
      />
    </div>

    <div class="p-4 space-y-3">
      <h3 class="text-lg font-semibold text-gray-800">
        {{ business.name }}
      </h3>

      <p class="text-gray-600 text-sm line-clamp-2">
        {{ business.description }}
      </p>

      <div class="flex items-center text-sm text-gray-500">
        <Icon name="heroicons:map-pin" class="w-4 h-4 mr-1" />
        <span>{{ business.location }}</span>
      </div>

      <div class="flex items-center justify-between pt-2">
        <div class="flex items-center gap-0.5">
          <Icon
            v-for="i in 5"
            :key="i"
            :name="
              i <= business.rating ? 'heroicons:star-solid' : 'heroicons:star'
            "
            class="w-4 h-4"
            :class="i <= business.rating ? 'text-yellow-400' : 'text-gray-300'"
          />
        </div>

        <NuxtLink
          :to="`/business/${business.id}`"
          class="text-primary hover:underline font-medium text-sm"
        >
          View Details
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface BusinessProps {
  id: string;
  name: string;
  description: string;
  category: string;
  location: string;
  rating: number;
  image?: string;
}

defineProps<{
  business: BusinessProps;
}>();
</script>
