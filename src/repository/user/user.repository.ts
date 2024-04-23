import axios from 'axios'
import { type User } from './user.schema'
import { INTERNAL_TOKEN } from '../../common/constant'
import { type IUserRepo } from './user.interface'

export class UserRepository implements IUserRepo {
  async getUser (id: number): Promise<User | null> {
    const config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${process.env.USER_SVC_DOMAIN}/api/users/${id}`,
      headers: {
        authorization: INTERNAL_TOKEN
      }
    }

    const response = await axios.request(config)
    return response.data.data as User
  }
}
