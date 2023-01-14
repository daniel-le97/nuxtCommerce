<template>
  <div>
    <h1>My Cart</h1>
    <div v-for="(item, index) in cartItems" :key="index">
      {{ item.name }} - {{ item.price }}
      <button @click="removeFromCart(index)">Remove</button>
    </div>
    <div>Total: {{ cartTotal }}</div>
    <div>Items in cart: {{ cartCount }}</div>
    <button @click="clearCart">Clear Cart</button>
  </div>
</template>

<script>
import { cartStore } from '@/store/cart'

export default {
  setup() {

    return {
      cartStore:useState(),
      cartItems: cartStore.items,
      cartTotal: cartStore.total,
      cartCount: cartStore.counter,
      removeFromCart: cartStore.removeProduct,
      clearCart: cartStore.clearCart
    }
  },
}
</script>
