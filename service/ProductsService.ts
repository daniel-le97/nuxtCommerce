import { AppState } from '~~/AppState'



class ProductsService{

  async getProducts(){


    const { find } = useStrapi()
    const res = await find('products')

  AppState.products = res.data.map(p=> p)
  }
}
export const productsService = new ProductsService()
