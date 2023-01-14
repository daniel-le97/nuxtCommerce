<template>
  <nuxt-link :to="`/products/${product.id}`">
    <div class="relative shadow-xl product-card rounded-lg">
      <img class=" object-cover  rounded-lg shadow-xl shadow-slate-400" :src="product.coverImage" alt="image">

      <div class="absolute top-0 left-0 w-full h-full  opacity-0 transition-opacity duration-300">

        <div class="p-4 text-white mt-10 text-center  ">
          <h4 class="text-2xl font-bold">
            {{ product.name }}
          </h4>

        </div>
      </div>


    </div>
  </nuxt-link>
</template>

<script>

import { Product } from "~~/models/Products.ts";
import { AppState } from '../AppState'

export default {
  props: {
    product: { type: Product, required: true }
  },
  setup () {
    return {

    }
  }
}
</script>

<style lang="scss" scoped>

.product-card:hover{
      width: 300px;
      transition: all 0.5s ease;
}
.product-card img{
width: 300px;
  height: 300px;
}
.product-card:hover .absolute {

    opacity: 0.8;
}
.product-card .absolute {
    transition: all 0.3s ease-out;

    opacity: 0;
}
.product-card:hover .absolute {
  transition: all 0.3s ease-out;
border-radius: 8px;
 background-color: rgba(0, 0, 0, 0.623);
 backdrop-filter: blur(4px);
    opacity: 1;

}
.product-card:hover img{
  filter: brightness(80%);
}

</style>
