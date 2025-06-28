import { defineNuxtConfig } from "nuxt/config";
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  // Enable or disable Nuxt DevTools
  devtools: { enabled: false },

  // Compatibility date for Nuxt
  compatibilityDate: "2025-05-12",

  // Global CSS files
  css: ["@/assets/css/main.css"],

  // Nuxt modules
  modules: [
    "@nuxt/content",
    "@nuxt/image",
    "@pinia/nuxt",
    "@nuxtjs/color-mode",
    "@nuxtjs/google-fonts",
  ],

  // Content module configuration
  content: {
    documentDriven: true,
    markdown: {
      remarkPlugins: [],
      rehypePlugins: [],
    },
    highlight: { theme: "github-dark" },
  },

  // Runtime configuration
  runtimeConfig: {
    public: {
      apiBase: process.env.API_BASE_URL || "http://localhost:1337",
      cloudinaryCloudName: process.env.CLOUDINARY_CLOUD_NAME || "",
      cloudinaryApiKey: process.env.CLOUDINARY_API_KEY || "",
      cloudinaryApiSecret: process.env.CLOUDINARY_API_SECRET || "",
    },
  },

  // Application metadata
  app: {
    head: {
      title: "BizFind",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "description", content: "Find and connect with businesses" },
      ],
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    },
  },

  // Plugins to run before rendering page
  plugins: [
    { src: "~~/plugins/axios.ts" },
    { src: "~~/plugins/toast.ts" },
    { src: "~~/plugins/iconify.ts" },
    { src: "~~/plugins/auth.ts" },
  ],

  // Auto import components
  components: {
    dirs: ["~~/components", "~~/components/layout"],
  },

  // Pinia store configuration
  pinia: {
    autoImports: ["defineStore"],
  },

  // Color mode configuration
  colorMode: {
    preference: "system",
    fallback: "light",
    classSuffix: "",
  },

  // Google Fonts configuration
  googleFonts: {
    families: {
      Inter: [400, 500, 600, 700],
    },
  },

  // Vite configuration
  vite: {
    plugins: [tailwindcss()],
    server: {
      hmr: {
        protocol: "ws",
        host: "localhost",
        port: 3000,
      },
    },
    define: {
      "process.env.DEBUG": false,
    },
  },
});
