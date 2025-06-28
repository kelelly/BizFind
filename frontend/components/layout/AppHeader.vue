<template>
  <header class="bg-white shadow-sm">
    <nav class="container mx-auto px-4 py-4">
      <div class="flex justify-between items-center">
        <NuxtLink to="/" class="text-2xl font-bold text-primary">
          BizFind
        </NuxtLink>

        <div class="hidden md:flex space-x-6">
          <NuxtLink
            v-for="link in navigationLinks"
            :key="link.path"
            :to="link.path"
            class="text-gray-600 hover:text-primary transition-colors"
          >
            {{ link.label }}
          </NuxtLink>
        </div>

        <div class="flex items-center space-x-4">
          <button class="md:hidden" @click="toggleMobileMenu">
            <Icon name="heroicons:bars-3" class="w-6 h-6" />
          </button>
        </div>
      </div>

      <!-- Mobile Menu -->
      <div v-if="isMobileMenuOpen" class="md:hidden mt-4 space-y-2">
        <NuxtLink
          v-for="link in navigationLinks"
          :key="link.path"
          :to="link.path"
          class="block py-2 text-gray-600 hover:text-primary"
          @click="isMobileMenuOpen = false"
        >
          {{ link.label }}
        </NuxtLink>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { ref } from "vue";

interface NavigationLink {
  path: string;
  label: string;
}

const navigationLinks: NavigationLink[] = [
  { path: "/", label: "Home" },
  { path: "/landingPage", label: ">>>" },
  { path: "/about", label: "About" },
  { path: "/businessList", label: "Businesses" },
  { path: "/contactUs", label: "Contact Us" },
  { path: "/businessRegister", label: "Register Business" },
  { path: "/loginPage", label: "Login" },
];

const isMobileMenuOpen = ref(false);

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};
</script>
* as vuevue.ref
