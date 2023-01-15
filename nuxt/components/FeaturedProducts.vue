<template>
  <div class=" container mt-10">
    <div class=" flex justify-center">
      <div id="card-container" class=" flex gap-2 justify-center">
        <ProductCard v-for="i in products" :key="i" class="" :product="i" />
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from "@vue/reactivity";
import { AppState } from "~~/AppState.ts";
export default {
  setup () {
    return {

    products:computed(() => AppState.products),
    }
  }
}
</script>
