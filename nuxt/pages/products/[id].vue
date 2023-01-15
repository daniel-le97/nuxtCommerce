<template>
  <div class="mt-56 text-black p-5">
    <div class="flex flex-wrap ">
      <div class=" w-full md:w-1/2 h-full justify-center flex">
        <LazyImage>
          <img :src="activeProduct.coverImage" alt="" class=" shadow-lg  shadow-slate-400 product-image rounded-sm">
        </LazyImage>
      </div>
      <div class=" w-full md:w-1/2 p-5 px-14">
        <div class="">
          <h1 class="text-4xl mb-10">
            {{ activeProduct.name }}
          </h1>
          <p class="text-lg text-gray-400 mb-5">
            {{ activeProduct.description }}
          </p>
        </div>

        <div class="flex justify-between">
          <div class="">
            <h2 class="font-bold text-gray-400 text-2xl">
              Price
            </h2>
            <p class="text-red-400 font-bold text-2xl">
              ${{ activeProduct.price }}
            </p>
          </div>
          <div class="">
            <h2 class="font-bold text-gray-400 text-2xl">
              Quantity
            </h2>
            <div class="relative inline-block">
              <input class=" bg-gray-200 rounded-lg p-1 shadow-lg" type="number" min="0" max="1" value="1">
            </div>
          </div>
        </div>

        <div class="flex justify-center">
          <AddToCart :product="activeProduct" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { productsService } from '~~/service/ProductsService.ts'

export default {

  setup () {
    onMounted(() => {
      getProductDetails()
    })
    onUnmounted(() => {
      clearCart()
    })
    async function getProductDetails () {
      try {
        await productsService.getProductById(route.params.id)
      } catch (error) {
        logger.log(error)
      }
    }

    async function clearCart () {

    }
    const route = useRoute()
    // console.log(route.params.id);
    return {
      route,
      activeProduct: computed(() =>
        AppState.activeProduct
      )

    }
  }
}
</script>

<style lang="scss" scoped>
.product-image{
  height: 50vh;
  width: 100% !important;
  object-fit: cover;
}
</style>
