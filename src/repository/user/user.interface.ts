import { type User } from './user.schema'

export interface IUserRepo {
  getUser: (id: number) => Promise<User | null>
}
