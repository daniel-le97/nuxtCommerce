import { AppState } from '~~/AppState'
import { Product } from '~~/models/Products'

class ProductsService {
  async getProducts () {
    const { find } = useStrapi()

    const res = await find<Product>('products')
    const products = res.data.map(r => new Product(r))

    AppState.products = products
  }

  async getProductById (productId:string) {
    const { findOne } = useStrapi()
    const res = await findOne<Product>('products', productId)

    // AppState.activeProduct = res((r: any) => new Product(r))

    AppState.activeProduct = new Product(res)
  }
}
export const productsService = new ProductsService()
