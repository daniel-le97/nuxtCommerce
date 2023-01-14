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
export default {
  setup () {
    onMounted(() => {
      fetchProducts()
    })

    async function fetchProducts () {
      try {
        await productsService.getProducts()
      } catch (err) {
        logger.error(err)
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
