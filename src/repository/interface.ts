import { type IUserRepo } from './user/user.interface'
import { type IUserAccountRepo } from './user_account/user_account.interface'

export interface IRepository {
  userAccount: IUserAccountRepo
  user: IUserRepo
}
