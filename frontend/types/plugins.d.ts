import type { AxiosInstance } from 'axios'

declare module '#app' {
  interface NuxtApp {
    $axios: AxiosInstance
    $toast: {
      success: (message: string) => void
      error: (message: string) => void
      info: (message: string) => void
      warning: (message: string) => void
    }
  }
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance
    $toast: {
      success: (message: string) => void
      error: (message: string) => void
      info: (message: string) => void
      warning: (message: string) => void
    }
  }
} 