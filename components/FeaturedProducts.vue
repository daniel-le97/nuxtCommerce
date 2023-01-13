<template>
  <div class=" container mt-10">


<div class=" flex justify-center">
  <div class=" flex" id="card-container">
  <ProductCard v-for="i in 3" class="card w-64 m-2"/>
  </div>

</div>


  </div>
</template>


<script>
export default {
  setup(){


  
    return {
 
    }
  }
}
</script>


<style lang="scss" scoped>

</style>