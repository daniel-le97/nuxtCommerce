<template>
  <div class=" container mt-10">


<div class=" flex justify-center">
  <div class=" flex gap-2" id="card-container">
  <ProductCard v-for="i in 3" class=""/>
  </div>

</div>


  </div>
</template>


<script>


export default {
  setup(){



    return {
//  products:computed(() => AppState.FeaturedProducts),
    }
  }
}
</script>


<style lang="scss" scoped>

</style>
