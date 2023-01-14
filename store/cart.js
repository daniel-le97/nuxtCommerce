export const state = () => ({
  items: [],
  total: 0,
});

export const mutations = {
  addProduct(state, product) {
    state.items.push(product);
    state.total += product.price;
  },
  removeProduct(state, index) {
    state.total -= state.items[index].price;
    state.items.splice(index, 1);
  },
  clearCart(state) {
    state.items = [];
    state.total = 0;
  },
};
