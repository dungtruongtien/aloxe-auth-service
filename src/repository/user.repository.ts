import axios from 'axios'
import { type IUserRepo } from './interface'
import { type User } from './schema/user'
import { INTERNAL_TOKEN } from '../common/constant'

export class UserRepository implements IUserRepo {
  async getUser (id: number): Promise<User | null> {
    const config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `http://localhost:4003/api/users/${id}`,
      headers: {
        authorization: INTERNAL_TOKEN
      }
    }

    const response = await axios.request(config)
    return response.data.data as User
  }
}
