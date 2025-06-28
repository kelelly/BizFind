declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

interface Window {
  $nuxt: any
}

declare module '@nuxt/schema' {
  interface NuxtConfig {
    runtimeConfig?: {
      public: {
        apiBase: string
        cloudinaryCloudName: string
        cloudinaryApiKey: string
        cloudinaryApiSecret: string
      }
    }
  }
} 