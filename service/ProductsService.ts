import { AppState } from '~~/AppState'

class ProductsService {
  async getProducts () {
    //  const res = await fetch('http://localhost:1337/api/products', {
    //       headers: {
    //         'Authorization': 'Bearer f0bc088d8e2c4b0d40947d1c771458134fe6459e4d0a8b8641d406a0cfc8df58ee077ad14a512ff942b68595ec06810f601c8fc20389b00fd7a7d5b1da5821205f0a5839eb675d9605ce8b5fa22868c2c934f7de32098e10e54df7af672e7057367d68e1551fbdf1b4cad49b5df2cdec9c737ec55bbb216d70fb1bf2f07b9315'
    //       }
    //     });
    //     const products = await res.json();
    //    console.log(products);

    const { find } = useStrapi()
    const res = await find('products')
    AppState.products = []
  }
}
export const productsService = new ProductsService()
