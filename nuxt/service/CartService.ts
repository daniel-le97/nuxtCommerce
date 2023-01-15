import App from 'next/app'
import { AppState } from '~~/AppState'
import { Product } from '~~/models/Products'

class CartService {

async getCart(){
  const {find} = useStrapi()
  const res =  await find('carts')
  console.log(res);

  res.data.forEach(c=> {
    c.attributes.Item.cartId = c.id
AppState.cart.products.push(c.attributes.Item)
  })
//  AppState.cart = res.data.map(c=> c.attributes?.Item)
console.log(AppState.cart);




}

async removeFromCart(cartId:string){
  const {delete:deleteOne} = useStrapi()

 deleteOne('carts',cartId)

 AppState.cart.products= AppState.cart.products.filter(c=> c.cartId != cartId)
}
 async clearCart(){
const { find, delete: deleteOne } = useStrapi();

 find('carts').then(response => {
        response.data.forEach(order => {
          deleteOne('carts', order.id);
        });
      });
}
}
export const cartService = new CartService()
