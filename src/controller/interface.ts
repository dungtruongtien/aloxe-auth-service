import { type NextFunction, type Request, type Response } from 'express'

export interface IUserAccountGraphController {
  login: (username: string, password: string) => Promise<IResponse>
}

export interface IUserAccountRestController {
  createUserAccount: (req: Request, res: Response, next: NextFunction) => Promise<any>
  login: (req: Request, res: Response, next: NextFunction) => Promise<any>
}

export interface IResponse {
  message: string
  code: string
  data: any
}
