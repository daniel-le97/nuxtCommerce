<template>
  <div>
    <HeroImage />
    <CallToAction />
    <FeaturedProducts />
    <AboutUs />
  </div>
</template>

<script>

import { AppState } from "~~/AppState.ts"
import { cartService } from "~~/service/CartService.ts"
import { productsService } from '../service/ProductsService'
export default {
  setup () {

    onMounted(() => {

  getGlasses()

    })
    onUnmounted(()=>{
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
async function clearCart(){
  try {
cartService.clearCart()

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
