import { AppState } from '~~/AppState'
import { Product } from '~~/models/Products'

class ProductsService {
  async getProducts () {
    const { find } = useStrapi()
    const res = await find('products', {
      populate: 'category'
    }
    )
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, array-callback-return
    const products = res.data.map((d) => {
      // @ts-ignore
      if (d.attributes?.category?.data?.attributes?.Name === 'Hats') {
        AppState.hats.push(new Product(d))
      } else { AppState.glasses.push(new Product(d)) }
    })
    logger.log(AppState.hats)
    logger.log(AppState.glasses)

    // const res = await find<Product>('products',{
    //   params:{
    //     _where:{category:'glasses'}
    //   }
    // })

    // AppState.products = products
  }

  async getProductById (productId:string) {
    const { findOne } = useStrapi()
    const res = await findOne<Product>('products', productId)

    // AppState.activeProduct = res((r: any) => new Product(r))

    AppState.activeProduct = new Product(res)
  }
}
export const productsService = new ProductsService()
