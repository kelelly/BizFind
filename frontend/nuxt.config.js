export default {
  // Server configuration
  server: {
    host: '0.0.0.0', // Allows external access, use 'localhost' for local-only access
    port: 3000,      // You can change the port if needed
  },

  // Meta tags and title configuration
  head: {
    title: 'BizFind',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Find businesses and services efficiently with BizFind.' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    ],
  },

  // Global CSS stylesheets
  css: [
    '@/assets/styles/main.css'
  ],

  // Nuxt.js build modules
  buildModules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/dotenv',
  ],

  // Nuxt.js modules
  modules: [
    '@nuxt/content',
    '@vite-pwa/nuxt',
    //'@nuxtjs/auth-next', // Not active
    '@sidebase/nuxt-auth',
    '@nuxtjs/sitemap',
    '@nuxtjs/robots',
  ],

  // Content module configuration
  content: {
    liveEdit: false,
  },

  // PWA module configuration
  pwa: {
    manifest: {
      name: 'BizFind',
      lang: 'en',
      useWebmanifestExtension: false,
      background_color: '#f5f5f5',
      theme_color: '#003366',
      start_url: 'https://bizfind.ke/',
    },
  },

  // Authentication configuration
  auth: {
    strategies: {
      local: {
        token: {
          property: 'token',
          global: true,
          required: true,
          type: 'Bearer',
        },
        user: {
          property: 'user',
          autoFetch: true,
        },
        endpoints: {
          login: { url: '/api/auth/login', method: 'post' },
          logout: { url: '/api/auth/logout', method: 'post' },
          user: { url: '/api/auth/user', method: 'get' },
        },
      },
    },
  },

  // Sitemap module configuration
  sitemap: {
    hostname: 'https://bizfind.com',
    gzip: true,
    routes: async () => {
      const routes = await fetch('https://bizfind.com/api/routes').then((res) => res.json());
      return routes.map((route) => route.path);
    },
  },

  // Robots module configuration
  robots: {
    UserAgent: '*',
    Disallow: '/admin',
    Allow: '/',
  },

  // Build configuration
  build: {
    extend(config, ctx) {
      // Example: Adding a rule for handling markdown files
      config.module.rules.push({
        test: /\.md$/,
        loader: 'raw-loader',
      });
    },
  },

  // Environment variables
  env: {
    API_BASE_URL: process.env.API_BASE_URL || 'http://localhost:3000/api',
  },
};
