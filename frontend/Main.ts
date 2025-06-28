<!-- main.ts -->
<script lang="ts">
import { createApp, Directive } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'

// Global Component
import Header from './components/Header.vue'

// Create Vue application
const app = createApp(App)

// Install Plugins
const pinia = createPinia()
app.use(pinia)
app.use(router)

// Register Global Component
app.component('Header', Header)

// Register Global Directive: v-focus
const focusDirective: Directive = {
  mounted(el: HTMLElement) {
    el.focus()
  }
}
app.directive('focus', focusDirective)

// Register Global Mixin (use sparingly)
app.mixin({
  methods: {
    hello(): void {
      // eslint-disable-next-line no-alert
      alert('Hello!')
    }
  }
})

// Mount Application
app.mount('#app')
</script>

<style>
/* global styles can go here or in separate CSS/SCSS files */
</style>
