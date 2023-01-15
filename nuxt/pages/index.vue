<template>
  <div>
    <HeroImage />
    <CallToAction />
    <FeaturedProducts />
    <AboutUs />
  </div>
</template>

<script>

import { productsService } from '../service/ProductsService'
import { cartService } from '../service/CartService'
import { AppState } from '../AppState'

export default {
  setup () {
    onMounted(() => {
      getGlasses()
    })
    onUnmounted(() => {
      // clearCart()
    })

    async function getGlasses () {
      try {
        AppState.glasses = []
        await productsService.getProducts()
      } catch (err) {
        logger.error(err)
      }
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async function clearCart () {
      try {
        await cartService.clearCart()
      } catch (error) {
        logger.error(error)
      }
    }
    return {
      products: []

    }
  }
}
</script>

<style lang="scss" scoped>

</style>
