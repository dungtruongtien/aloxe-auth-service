import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { GraphQLError } from 'graphql'
import { type ILoginResponse, type IUserAccountService } from './user_account.interface'
import { type IUserRepo, type IUserAccountRepo } from '../../repository/interface'
import { AUTH_ACCESS_SERCRET_KEY } from '../../common/constant'
import { type Prisma, type UserAccount } from '@prisma/client'
import { type ICreateUserAccountInput } from './user_account.dto'

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
      throw new GraphQLError('Invalid login credential', {
        extensions: { code: 'UserAccountNotFound' }
      })
    }

    const isEqual = bcrypt.compareSync(password, existsUserAccount.password)
    if (!isEqual) {
      throw new GraphQLError('Invalid login credential', {
        extensions: { code: 'AuthenticationFailed' }
      })
    }

    const userData = await this.userRepo.getUser(existsUserAccount.userId)
    if (!userData) {
      throw new GraphQLError('Invalid login credential', {
        extensions: { code: 'UserNotFound' }
      })
    }

    const accessTokenPayload = {
      account: existsUserAccount.id,
      user: {
        id: userData.id
      }
      // customer: customer ? { id: customer.id } : {},
      // driver: driver ? { id: driver.id } : {},
      // staff: staff ? { id: staff.id } : {}
    }
    const accessToken = jwt.sign(accessTokenPayload, AUTH_ACCESS_SERCRET_KEY)

    return {
      accessToken,
      phoneNumber: userData.fullName,
      fullName: userData.fullName
      // userId: existsUser.id,
      // role: existsUser.role,
      // fullName: existsUser.fullName,
      // customerId: userData.id,
      // driverId: driver ? driver.id : null,
      // staffId: staff ? staff.id : null,
      // email: existsUser.email
    }
  }

  async createUserAccount (input: ICreateUserAccountInput): Promise<UserAccount> {
    const salt = bcrypt.genSaltSync(10)
    const hashedPassword = bcrypt.hashSync(input.password, salt)
    const createUserAccountDto: Prisma.UserAccountCreateInput = {
      username: input.username,
      password: hashedPassword,
      userId: input.userId
    }
    return await this.userAccountRepo.createUserAccount(createUserAccountDto)
  }
}
