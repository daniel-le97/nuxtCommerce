import { Account } from './models/Account'
import { Product } from './models/Products'
export const AppState = reactive({
  user: null,
  account: {} as Account,
  products: [] as Product[],
  activeProduct: {} as Product

})
