// import { Account } from '~~/models/Account'

class AccountService {
  async getAccount (user?: any) {
    try {
      let account
      account = await findOne('users', user.id)
      if (!account) {
        account = await (await create('users', user)).data.attributes
      }
    } catch (error) {

    }
  }
}
export const accountService = new AccountService()
