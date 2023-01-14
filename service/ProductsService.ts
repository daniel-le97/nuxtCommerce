import { AppState } from '~~/AppState'
import { Product } from '~~/models/Products'

class ProductsService {
  async getProducts () {
    const { find } = useStrapi()
    const res = await find<Product>('products')
    const products = res.data.map(r => new Product(r))
    AppState.products = products
  }
}
export const productsService = new ProductsService()
