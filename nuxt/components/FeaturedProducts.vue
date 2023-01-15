<template>
  <div class=" container mt-10">
    <div id="card-container" class=" flex gap-2 justify-center w-full">
      <ProductCard v-for="i in products" :key="i" class="" :product="i" />
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'

export default {
  setup () {
    return {

      products: computed(() => AppState.products)
    }
  }
}
</script>
