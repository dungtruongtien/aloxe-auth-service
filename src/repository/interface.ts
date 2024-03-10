import { type Prisma, type UserAccount } from '@prisma/client'
import { type User } from './schema/user'

export interface IRepository {
  userAccount: IUserAccountRepo
  user: IUserRepo
}

export interface IUserAccountRepo {
  getUserAccounts: () => Promise<UserAccount[]>
  getUserAccount: (username: string) => Promise<UserAccount | null>
  createUserAccount: (dto: Prisma.UserAccountCreateInput) => Promise<UserAccount>
}

export interface IUserRepo {
  getUser: (id: number) => Promise<User | null>
}
