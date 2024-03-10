import { UserRepository } from '../repository/user.repository'
import { UserAccountRepository } from '../repository/user_account.repository'
import { type ICreateUserAccountInput } from '../services/dto/user.dto'
import { type IUserAccountService } from '../services/interface'
import { UserAccountService } from '../services/user_account.service'
import { type IResponse, type IUserAccountRestController } from './interface'

export default class UserAccountRestController implements IUserAccountRestController {
  private readonly userAccountService: IUserAccountService
  private readonly userAccountRepository = new UserAccountRepository()
  private readonly userRepository = new UserRepository()
  constructor () {
    this.userAccountService = new UserAccountService(this.userAccountRepository, this.userRepository)
  }

  async createUserAccount (input: ICreateUserAccountInput): Promise<IResponse> {
    const data = await this.userAccountService.createUserAccount(input)
    return {
      message: 'success',
      code: '',
      data
    }
  }
}
