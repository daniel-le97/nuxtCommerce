export class Product {
id: Number
name: String
coverImage: String
price: Number
description:String

  constructor (data: any) {
    this.id = data.id
    this.name = data.attributes.Name
    this.coverImage = data.attributes.CoverImage
    this.price = data.attributes.Price
    this.description = data.attributes.Description

  }
}
