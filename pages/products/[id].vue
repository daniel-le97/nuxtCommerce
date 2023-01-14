<template>
  <div class="mt-56 text-black p-5">

<div class="flex flex-wrap ">

  <div class=" w-full md:w-1/2 h-full">
<img :src="product.img" alt="" class="shadow-lg  product-image">
  </div>
  <div class=" w-full md:w-1/2 p-5 px-14">
<div class="">
  <h1 class="text-4xl mb-10">{{ product.name }}  </h1>
  <p class="text-sm text-gray-400 mb-5">

    {{ product.description }}
  </p>

</div>

<div class="flex justify-between">
  <div class="">
    <h2 class="font-bold text-gray-400 text-2xl">Price</h2>
    <p class="text-red-400 font-bold text-2xl"> ${{ product.price }} </p>
  </div>
  <div class="">
    <h2 class="font-bold text-gray-400 text-2xl">Quantity</h2>
 <div class="relative inline-block">
  <input class=" bg-gray-200 rounded-lg p-1 shadow-lg" type="number" min="0"   max="1" value="1">

</div>
  </div>
</div>


<div class="flex justify-center">
 <button class="bg-black shadow-lg text-white rounded-md px-4 py-2 hover:bg-blue-600 focus:outline-none">Add to Cart</button>
</div>

  </div>
</div>

  </div>
</template>

<script>
import { AppState } from "~~/AppState.ts";
import { computed } from "@vue/reactivity";
export default {

  setup () {

    const route = useRoute()
    console.log(route.params.id);
    return {
      product: computed(()=>
        AppState.featuredProducts.find(f=> f.id == route.params.id)
      ),

    }
  }
}
</script>

<style lang="scss" scoped>
.product-image{
  height: 50vh;
  width: auto;
  object-fit: cover;
}
</style>
