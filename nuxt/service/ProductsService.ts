
import { Product } from '~~/models/Products'

class ProductsService {
  async getProducts () {
    const { find } = useStrapi()
    const res = await find('products', {

      populate: 'category'

    }
    )
    logger.log(res.data)

    AppState.products = res.data.map(d => new Product(d))
    // console.log(AppState.hats);
    // console.log(AppState.glasses);
  }

  async getProductById (productId:string) {
    const { findOne } = useStrapi()
    const res = await findOne<Product>('products', productId)

    // AppState.activeProduct = res((r: any) => new Product(r))

    AppState.activeProduct = new Product(res.data)
  }

  async addProductToOrder (product:Product) {
    logger.log(product)
    const { create } = useStrapi()
    const res = await create('carts', { Item: product })
    logger.log(res.data)
    const newCart = new Product(res.data)
    AppState.cart.products.push(newCart)
  }
}
export const productsService = new ProductsService()
