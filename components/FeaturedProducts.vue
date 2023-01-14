<template>
  <div class=" container mt-10">


<div class=" flex justify-center">
  <div class=" flex gap-2" id="card-container">
  <ProductCard v-for="i in products" class="" :product="i" />
  </div>

</div>


  </div>
</template>


<script>


import { AppState } from "~~/AppState.ts";

export default {
  setup(){



    return {
 products:computed(() => AppState.featuredProducts),
    }
  }
}
</script>


<style lang="scss" scoped>

</style>
