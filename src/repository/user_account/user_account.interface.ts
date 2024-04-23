import { type Prisma, type UserAccount } from '@prisma/client'

export interface IUserAccountRepo {
  getUserAccounts: () => Promise<UserAccount[]>
  getUserAccount: (username: string) => Promise<UserAccount | null>
  createUserAccount: (dto: Prisma.UserAccountCreateInput) => Promise<UserAccount>
}
