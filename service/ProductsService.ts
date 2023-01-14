


class ProductsService{

  async getProducts(){


   const { find } = useStrapi()
  const res = await find('products')



  }
}
export const productsService = new ProductsService()
