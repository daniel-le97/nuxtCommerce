// https://nuxt.com/docs/api/configuration/nuxt-config
// import { NUXT_PUBLIC_STRAPI_URL } from './.env'

export default defineNuxtConfig({

  modules: [
    '@sidebase/nuxt-auth',
    '@nuxtjs/tailwindcss',
    'nuxt-swiper',
    '@vueuse/nuxt',
    '@pinia/nuxt',
    '@nuxtjs/strapi'
  ],
  strapi: { url: process.env.NUXT_PUBLIC_STRAPI_URL || 'http://localhost:1337' },
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
