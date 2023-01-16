/* eslint-disable require-await */

import { Product } from '~~/models/Products'

class CartService {
  async getCart () {
    const { find } = useStrapi()
    const res = await find('carts')
    logger.log(res)

    res.data.forEach((c) => {
      c.attributes.Item.cartId = c.id
      AppState.cart.products.push(c.attributes.Item)
    })
    //  AppState.cart = res.data.map(c=> c.attributes?.Item)
    logger.log(AppState.cart)
    pop.confirm('hi')
  }

  async removeFromCart (cartId:string) {
    const { delete: deleteOne } = useStrapi()

    deleteOne('carts', cartId)

    // eslint-disable-next-line eqeqeq
    AppState.cart.products = AppState.cart.products.filter(c => c.id != cartId)
  }

  async clearCart () {
    const { find, delete: deleteOne } = useStrapi()

    await find('carts').then((response) => {
      response.data.forEach((order) => {
        deleteOne('carts', order.id)
      })
    })
  }
}
export const cartService = new CartService()
