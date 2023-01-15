<template>
  <div>
    <button class="p-2 px-4 text-3xl rounded-md bg-blue-400" @click="removeItem(cartId)">
      Remove
    </button>
  </div>
</template>

<script>
// import { cartService } from '~~/service/CartService.ts'
// import { productsService } from '~~/service/ProductsService.ts'

import { cartService } from '../service/CartService'

export default {
  props: ['cartId'],
  setup () {
    return {
      async removeItem (cartId) {
        try {
          await cartService.removeFromCart(cartId)
        } catch (error) {
          logger.log(error)
        }
      }

    }
  }

}
</script>
