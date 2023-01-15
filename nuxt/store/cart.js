import { defineStore, acceptHMRUpdate } from 'pinia'

export const cartStore = defineStore('cart', {
  state: () => ({
    items: [],
    total: 0
  }),
  mutations: {
    addProduct (state, product) {
      state.items.push(product)
      state.total += product.price
    },
    removeProduct (state, index) {
      state.total -= state.items[index].price
      state.items.splice(index, 1)
    },
    clearCart (state) {
      state.items = []
      state.total = 0
    }
  },
  actions: {
    addToCart ({ commit }, product) {
      commit('addProduct', product)
    },
    removeFromCart ({ commit }, index) {
      commit('removeProduct', index)
    },
    clearCart ({ commit }) {
      commit('clearCart')
    }
  },
  getters: {
    cartItems: state => state.items,
    cartTotal: state => state.total,
    cartCount: state => state.items.length
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(cartStore, import.meta.hot))
}
