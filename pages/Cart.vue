<!-- <template>
    <div>
        <div v-for="(product, index) in cartItems" :key="index">
            {{ product.name }} - {{ product.price }}
            <button @click="removeProduct(index)">Remove</button>
        </div>
        Total: {{ cartTotal }}
        <button @click="clearCart">Clear cart</button>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
    computed: {
        ...mapState({
            cartItems: state => state.cart.items,
            cartTotal: state => state.cart.total
        }),
        ...mapActions('cart', ['removeProduct', 'clearCart'])
    }
}
</script> -->
<template>
  <div class="component">


  </div>
</template>


<script>
export default {
  setup(){
    return {}
  }
}
</script>


<style lang="scss" scoped>

</style>
