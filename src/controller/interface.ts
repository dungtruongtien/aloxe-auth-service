import { type ICreateUserAccountInput } from '../services/dto/user.dto'

export interface IUserAccountGraphController {
  login: (username: string, password: string) => Promise<IResponse>
}

export interface IUserAccountRestController {
  createUserAccount: (input: ICreateUserAccountInput) => Promise<IResponse>
}

export interface IResponse {
  message: string
  code: string
  data: any
}
