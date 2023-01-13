export class Account {
  picture: String
  id: String | Number
  email: String
  name: String
  constructor (data: any) {
    this.id = data.id
    this.email = data.email
    this.name = data.name
    this.picture = data.picture
    // TODO add additional properties if needed
  }
}
