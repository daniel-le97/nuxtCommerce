<template>
  <div>
    <HeroImage />
    <CallToAction />
    <FeaturedProducts />
    <AboutUs />
    <button @click="getDogs">
      get
    </button>
    <div v-if="dogs">
      {{ dogs }}
    </div>
  </div>
</template>
<script>
import { AppState } from '../AppState.ts'
export default {
  setup () {
    return {
      dogs: computed(() => AppState.products),
      async getDogs () {
        try {
          const hi = await useFetch('/api/products', {
            method: 'GET'
          })
          AppState.products = hi.data.value
          // eslint-disable-next-line no-console
          console.log(AppState.products)
        } catch (error) {
          // Pop.error(error)
        }
      }
    }
  }
}
</script>
