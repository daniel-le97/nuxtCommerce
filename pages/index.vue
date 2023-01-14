<template>
  <div>
    <HeroImage />
    <CallToAction />
    <FeaturedProducts />
    <AboutUs />

  </div>
</template>



<script>

import {productsService} from '../service/ProductsService.ts'
export default {
  setup(){
    onMounted(()=>{
fetchProducts()
    })

async function fetchProducts() {
      try {
productsService.getProducts()
      } catch (err) {
        console.error(err);
      }
    }



    return {
    

    }
  }
}
</script>


<style lang="scss" scoped>

</style>
