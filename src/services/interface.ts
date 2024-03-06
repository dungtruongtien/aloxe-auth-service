export interface IService {
  userAccount: IUserAccountService
}

export interface IUserAccountService {
  login: (username: string, password: string) => Promise<ILoginResponse | null>
}

export interface ILoginResponse {
  accessToken: string
  fullName?: string
  phoneNumber?: string
}
