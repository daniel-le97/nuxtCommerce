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




export default {
  setup(){



    return {
 products:computed(() => AppState),
    }
  }
}
</script>


<style lang="scss" scoped>

</style>
