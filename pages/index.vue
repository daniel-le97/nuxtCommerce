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
const { find } = useStrapi()
  const response = await find('products')
      console.log(response);
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
