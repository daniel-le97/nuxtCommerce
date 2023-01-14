// https://nuxt.com/docs/api/configuration/nuxt-config


export default defineNuxtConfig({
  modules: [
    '@sidebase/nuxt-auth',
    '@nuxtjs/tailwindcss',
    'nuxt-swiper',
    '@vueuse/nuxt',
     '@pinia/nuxt',
  ],
  typescript: {
    shim: false
  },
  tailwindcss: {
    config: {
      content: [],
      theme: {
        container: {
          center: true,
          padding: '1rem'
        }
      }
    }
  },

  css: [
    '@/assets/scss/main.scss'
  ]
})
