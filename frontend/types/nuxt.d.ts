import { NuxtConfig } from '@nuxt/schema'

declare module '@nuxt/schema' {
  interface NuxtConfig {
    devtools?: {
      enabled?: boolean
    }
    modules?: string[]
    runtimeConfig?: {
      public?: {
        [key: string]: any
      }
    }
    app?: {
      head?: {
        title?: string
        meta?: Array<Record<string, string>>
        link?: Array<Record<string, string>>
      }
    }
    css?: string[]
    plugins?: Array<{ src: string }>
    components?: {
      dirs?: string[]
    }
    tailwindcss?: {
      configPath?: string
      cssPath?: string
    }
    pinia?: {
      autoImports?: string[]
    }
    supabase?: {
      url?: string
      key?: string
    }
    i18n?: {
      locales?: Array<{
        code: string
        iso: string
        file: string
      }>
      defaultLocale?: string
      lazy?: boolean
      langDir?: string
    }
    colorMode?: {
      preference?: string
      fallback?: string
      classSuffix?: string
    }
    googleFonts?: {
      families?: Record<string, number[]>
    }
  }
} 