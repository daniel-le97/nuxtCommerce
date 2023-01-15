<template>
  <div class="container mt-24 flex flex-col">
    <h1 class="text-4xl"> Cart</h1>
 <TransitionGroup name="list" >
     <div class="mt-5 rounded-md shadow-lg shadow-slate-400 p-5 text-dark " v-for="(c, index) in cart" :key="index"

     >
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

 </TransitionGroup>
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
    },











    }
  },
}
</script>

<style scoped lang="scss" >


.list-move, /* apply transition to moving elements */
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;

}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}


/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.list-leave-active {
  position: absolute;


}




.slide-out-leave-active {
  animation: slide-out 0.5s;
}

@keyframes slide-out {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-100%);
  }
}
.image{
  height: 100px;
  width: 100px;
  object-fit: cover;
}
</style>
