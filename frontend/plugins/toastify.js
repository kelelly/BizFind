import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

// Configure Toastify default options
const toastOptions = {
  position: 'top-right',
  autoClose: 5000, // Duration in milliseconds
  closeButton: true,
  pauseOnHover: true,
  draggable: true,
};

export default defineNuxtPlugin((nuxtApp) => {
  // Use the toast instance directly
  nuxtApp.provide('toast', (message, options = {}) =>
    toast(message, { ...toastOptions, ...options })
  );

  // Example: Accessing the Nuxt app context (for custom configurations or debugging)
  // console.log(nuxtApp);
});
