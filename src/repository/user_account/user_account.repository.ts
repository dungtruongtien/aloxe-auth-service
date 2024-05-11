import prisma from '../../client/prisma'
import { type Prisma, type UserAccount } from '@prisma/client'
import { type IUserAccountRepo } from './user_account.interface'

export class UserAccountRepository implements IUserAccountRepo {
  async getUserAccounts (): Promise<UserAccount[]> {
    return await prisma.userAccount.findMany()
  }

  async getUserAccount (phoneNumber: string): Promise<UserAccount | null> {
    return await prisma.userAccount.findUnique({
      where: {
        username: phoneNumber
      }
    })
  }

  async createUserAccount (dto: Prisma.UserAccountCreateInput): Promise<UserAccount> {
    return await prisma.userAccount.create({
      data: dto
    })
  }
}
