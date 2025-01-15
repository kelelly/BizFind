import { createToast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

// Configure Toastify
const toastOptions = {
  position: 'top-right',
  autoClose: 5000, // Duration in milliseconds
  closeButton: true,
  pauseOnHover: true,
  draggable: true,
};

export default defineNuxtPlugin((nuxtApp) => {
  // Create a Toast instance
  const toast = createToast(toastOptions);

  // Add $toast to the Nuxt app context
  nuxtApp.provide('toast', toast);

  // You can access the Nuxt app context using nuxtApp
  // For example:
  // console.log(nuxtApp.$nuxt); // This should work
});