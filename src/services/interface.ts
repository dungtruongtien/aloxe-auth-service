import { type UserAccount } from '@prisma/client'
import { type ICreateUserAccountInput } from './dto/user.dto'

export interface IService {
  userAccount: IUserAccountService
}

export interface IUserAccountService {
  login: (username: string, password: string) => Promise<ILoginResponse | null>
  createUserAccount: (input: ICreateUserAccountInput) => Promise<UserAccount>
}

export interface ILoginResponse {
  accessToken: string
  fullName?: string
  phoneNumber?: string
}
