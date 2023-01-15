<template>
  <div class="container mt-24">
    <h1 class="text-4xl"> Cart</h1>
    <div class="mt-5 rounded-md shadow-lg shadow-slate-400 p-5 text-dark" v-for="(c, index) in cart" :key="index">
    <div class="flex justify-between">
      <img :src="c.coverImage" alt="" class="image shadow-xl shadow-slate-400 rounded-sm">

      <div class="text-center  items-center flex text-xl">
       <h1> {{ c.name }}</h1>
      </div>
      <div class="flex">
        <p class="text-center mr-10  items-center flex font-bold">
          ${{ c.price }}
        </p>
  <RemoveFromCart :cartId="c.cartId" />
      </div>
    </div>

    </div>

    <button class="mt-5 text-3xl" @click="clearCart">Clear Cart</button>
  </div>
</template>

<script>
import { computed } from "@vue/reactivity";

import { AppState } from "~~/AppState.ts";
import { cartService } from "~~/service/CartService.ts";

export default {
  setup() {
onMounted(()=>{
  getCart()
})
async function getCart(){
  try {
await cartService.getCart()
  } catch (error) {
    logger.error(error)
  }
}
    return {
    cart:computed(() => AppState.cart.products),
    async clearCart(){
      try {
        console.log(AppState.cart);
// cartService.clearCart()
      } catch (error) {
        logger.error(error)
      }
    }
    }
  },
}
</script>

<style scoped lang="scss" >


.image{
  height: 100px;
  width: 100px;
  object-fit: cover;
}
</style>
