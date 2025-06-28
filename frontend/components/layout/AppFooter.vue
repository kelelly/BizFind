<template>
  <footer class="bg-gray-900 text-white py-8">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 class="text-xl font-bold mb-4">BizFind</h3>
          <p class="text-gray-400">
            Your trusted partner in business discovery and growth.
          </p>
        </div>

        <div>
          <h4 class="text-lg font-semibold mb-4">Quick Links</h4>
          <ul class="space-y-2">
            <li v-for="link in footerLinks" :key="link.path">
              <NuxtLink
                :to="link.path"
                class="text-gray-400 hover:text-white transition-colors"
              >
                {{ link.label }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <div>
          <h4 class="text-lg font-semibold mb-4">Contact Us</h4>
          <ul class="space-y-2 text-gray-400">
            <li>Email: info@bizfind.com</li>
            <li>Phone: +1 (555) 123-4567</li>
            <li>Address: 123 Business St, City, Country</li>
          </ul>
        </div>
      </div>

      <div class="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
        <p>&copy; {{ currentYear }} BizFind. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
interface FooterLink {
  path: string;
  label: string;
}

const footerLinks: FooterLink[] = [
  { path: "/about", label: "About Us" },
  { path: "/contactUs", label: "Contact Us" },
  { path: "/privacyPolicy", label: "Privacy Policy" },
  { path: "/termsAndConditions", label: "Terms of Service" },
];

const currentYear = new Date().getFullYear();
</script>
