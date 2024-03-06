import { UserRepository } from '../repository/user.repository'
import { UserAccountRepository } from '../repository/user_account.repository'
import { type IUserAccountService } from '../services/interface'
import { UserAccountService } from '../services/user_account.service'
import { type IResponse, type IUserAccountController } from './interface'

export default class UserAccountController implements IUserAccountController {
  private readonly userAccountService: IUserAccountService
  private readonly userAccountRepository = new UserAccountRepository()
  private readonly userRepository = new UserRepository()
  constructor () {
    this.userAccountService = new UserAccountService(this.userAccountRepository, this.userRepository)
  }

  async login (username: string, password: string): Promise<IResponse> {
    const data = await this.userAccountService.login(username, password)
    return {
      message: 'success',
      code: '',
      data
    }
  }
}
