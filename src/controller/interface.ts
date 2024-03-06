export interface IUserAccountController {
  login: (username: string, password: string) => Promise<IResponse>
}

export interface IResponse {
  message: string
  code: string
  data: any
}
