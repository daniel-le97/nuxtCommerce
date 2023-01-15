// import { Account } from '~~/models/Account'

class AccountService {
  async getAccount (user?: any) {
    try {
      let account
      account = await findOne('users', user.id)
      if (!account) {
        account = await this.createAccountIfNeeded(user)
      }
    } catch (error) {
      pop.error(error, 'is strapi running?')
    }
  }

  async createAccountIfNeeded (user: any) {
    const newAccount = await create('users', user)
    return newAccount
  }
}
export const accountService = new AccountService()
