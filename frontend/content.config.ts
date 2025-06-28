import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  content: {
    // Configure content sources
    sources: {
      content: {
        driver: 'fs',
        prefix: '/content',
        base: './content'
      }
    },
    // Configure markdown options
    markdown: {
      remarkPlugins: [],
      rehypePlugins: []
    }
  }
}) 