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
       products: [],

    }
  }
}
</script>


<style lang="scss" scoped>

</style>
