<template>
  <nuxt-link :to="`/products/${product.id}`">
    <div class="relative shadow-xl product-card rounded-lg">
      <img class=" object-cover  image rounded-lg shadow-xl shadow-slate-400 transition-all" :src="product.coverImage" alt="image">

      <div class="absolute  top-64 left-0 w-full h-full  opacity-0 transition-opacity duration-300">
        <div class=" text-white mt-10 text-center  ">
          <h4 class="text-3xl font-bold text-shadow  ">
            {{ product.name }}
          </h4>
        </div>
      </div>
    </div>
  </nuxt-link>
</template>

<script>

import { Product } from '~~/models/Products.ts'

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
.product-card{
   transition: all 0.5s ease-out !important;
   width: 125px;
   height: 400px;
}
.image{

}
.product-card:hover{
width: 300px;
  transition: all 0.5s ease-out !important;
}

.product-card img{
  transition: all 3.3s ease-out !important;
  height: 100%;
}
.product-card:hover .absolute {

    opacity: 0.8;
}
.product-card .absolute {
    transition: all 0.3s ease-out;

}
.product-card:hover .absolute {
  transition: all 0.3s ease-out;
border-radius: 8px;

}
.product-card:hover img{
  filter: brightness(80%);
width: 400px;
  transition: all 3.3s ease-out !important;
}

</style>
