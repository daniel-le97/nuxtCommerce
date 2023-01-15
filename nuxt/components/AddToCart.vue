<template>
  <div>
    <button class="p-2 px-4 text-3xl rounded-md bg-blue-400" @click="addProduct(product)">
      Add to cart
    </button>
  </div>
</template>

<script>
import { productsService } from '~~/service/ProductsService.ts'

export default {
  props: ['product'],
  setup () {
    return {
      async addProduct (product) {
        try {
          logger.log(product)
          await productsService.addProductToOrder(product)
        } catch (error) {
          logger.log(error)
        }
      }

    }
  }

}
</script>
