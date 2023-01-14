export class Product {
  id: String
  name: String
  coverImage: String
  price: Number
  images: String | String[]
  constructor (data: any) {
    this.id = data.id
    this.name = data.name
    this.coverImage = data.coverImage
    this.price = data.price
    this.images = data.images
  }
}
