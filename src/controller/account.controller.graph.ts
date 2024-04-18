import { UserRepository } from '../repository/user.repository'
import { UserAccountRepository } from '../repository/user_account.repository'
import { type IUserAccountService } from '../services/user_account/user_account.interface'
import { UserAccountService } from '../services/user_account/user_account.service'
import { type IResponse, type IUserAccountGraphController } from './interface'

export default class UserAccountGraphController implements IUserAccountGraphController {
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
