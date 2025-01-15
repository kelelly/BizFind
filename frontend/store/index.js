import app from './server/App';

app.use((req, res, next) => {
  console.log('Request URL:', req.url);
  next();
});

export default {
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
  css: ['~/assets/styles/css/main.css'],

  // Nuxt.js build modules
  buildModules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/dotenv',
  ],

  // Nuxt.js modules
  modules: [
    '@nuxt/fonts',
    '@nuxt/ui',
    'nuxt-aos',
    '@nuxt/image',
    '@formkit/auto-animate/nuxt',
    '@vite-pwa/nuxt',
    '@nuxt/eslint',
    '@nuxt/content',
    '@vueuse/nuxt',
  ],

  // Iconify configuration
  iconify: {
    serverBundle: {
      collections: ['mdi', 'di-light', 'heroicons-outline', 'heroicons-solid'] // specify the collections you're using
    }
  },

  // Plugins
  plugins: [
    '~/client/plugins/toastify.js'
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
      start_url: 'https://bizfinding.com/',
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
    hostname: 'https://bizfinding.com',
    gzip: true,
    routes: async () => {
      const routes = await fetch('https://bizfinding.com/api/routes').then((res) => res.json());
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
    extend(config) {
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

  // Nitro configuration
  nitro: {
    prerender: {
      concurrency: 1
    }
  },

  // Compatibility date
  compatibilityDate: '2024-08-04',
};
