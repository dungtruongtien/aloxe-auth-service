import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { type ILoginResponse, type IUserAccountService } from './user_account.interface'
import { AUTH_ACCESS_SERCRET_KEY } from '../../common/constant'
import { type Prisma, type UserAccount } from '@prisma/client'
import { type ICreateUserAccountInput } from './user_account.dto'
import { type IUserRepo } from '../../repository/user/user.interface'
import { type IUserAccountRepo } from '../../repository/user_account/user_account.interface'
import { NotfoundError } from '../../common/custom_error'

const ROLE_MAPPING_STR: Record<number, string> = {
  1: 'STAFF',
  2: 'CUSTOMER',
  3: 'DRIVER'
}
export class UserAccountService implements IUserAccountService {
  private readonly userAccountRepo: IUserAccountRepo
  private readonly userRepo: IUserRepo
  constructor (userAccountRepo: IUserAccountRepo, userRepo: IUserRepo) {
    this.userAccountRepo = userAccountRepo
    this.userRepo = userRepo
  }

  async login (username: string, password: string): Promise<ILoginResponse | null> {
    const existsUserAccount = await this.userAccountRepo.getUserAccount(username)
    if (!existsUserAccount) {
      throw new NotfoundError('Invalid login credential', 'AuthenticationError')
    }

    const isEqual = bcrypt.compareSync(password, existsUserAccount.password)
    if (!isEqual) {
      throw new Error('Invalid login credential')
    }

    const userData = await this.userRepo.getUser(existsUserAccount.userId)
    if (!userData) {
      throw new Error('Invalid login credential')
    }

    const accessTokenPayload = {
      accountId: existsUserAccount.id,
      user: {
        id: userData.id
      },
      customer: userData.customer ? { id: userData.customer.id } : {},
      driver: userData.driver ? { id: userData.driver.id } : {},
      staff: userData.staff ? { id: userData.staff.id } : {}
    }
    const accessToken = jwt.sign(accessTokenPayload, AUTH_ACCESS_SERCRET_KEY)

    return {
      accessToken,
      phoneNumber: userData.fullName,
      fullName: userData.fullName,
      userId: userData.id,
      role: ROLE_MAPPING_STR[userData.role],
      customerId: userData.customer ? userData.customer.id : 0,
      driverId: userData.driver ? userData.driver.id : 0,
      staffId: userData.staff ? userData.staff.id : 0,
      email: userData.email
    }
  }

  async createUserAccount (input: ICreateUserAccountInput): Promise<UserAccount> {
    const createUserAccountDto: Prisma.UserAccountCreateInput = {
      username: input.username,
      password: input.password,
      userId: input.userId
    }
    return await this.userAccountRepo.createUserAccount(createUserAccountDto)
  }
}
