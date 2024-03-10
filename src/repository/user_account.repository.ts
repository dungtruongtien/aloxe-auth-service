import { type IUserAccountRepo } from './interface'
import prisma from '../client/prisma'
import { type Prisma, type UserAccount } from '@prisma/client'

export class UserAccountRepository implements IUserAccountRepo {
  async getUserAccounts (): Promise<UserAccount[]> {
    return await prisma.userAccount.findMany()
  }

  async getUserAccount (username: string): Promise<UserAccount | null> {
    return await prisma.userAccount.findUnique({
      where: {
        username
      }
    })
  }

  async createUserAccount (dto: Prisma.UserAccountCreateInput): Promise<UserAccount> {
    return await prisma.userAccount.create({
      data: dto
    })
  }
}
