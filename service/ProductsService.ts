import { AppState } from '~~/AppState'
import { Product } from '~~/models/Products'

class ProductsService {
  async getProducts () {
    const { find } = useStrapi()
    const res = await find('products', {

      populate: 'category'

    }
    )
    // eslint-disable-next-line array-callback-return
    res.data.map((d) => {
      // @ts-ignore
      if (d.attributes?.category?.data?.attributes?.Name === 'Hats') {
        AppState.hats.push(new Product(d))
      } else { AppState.glasses.push(new Product(d)) }
    })
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
