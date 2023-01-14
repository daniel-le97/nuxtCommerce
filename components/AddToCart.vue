<template>
  <div>
    <button class="p-2 px-4 text-3xl rounded-md bg-blue-400" @click="addProduct(productId)">
      Add to cart
    </button>
  </div>
</template>

<script>
// import { storeToRefs } from 'pinia'
import { cartStore } from '@/store/cart'

export default {
  props: ['productId'],
  setup () {
    const cart = cartStore()
    // const { addToCart } = storeToRefs(cart)
    return {
      cart

    }
  }

}
</script>
