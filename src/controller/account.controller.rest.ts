import { type NextFunction, type Request, type Response } from 'express'
import { UserRepository } from '../repository/user/user.repository'
import { UserAccountRepository } from '../repository/user_account/user_account.repository'
import { type ICreateUserAccountInput } from '../services/user_account/user_account.dto'
import { type IUserAccountService } from '../services/user_account/user_account.interface'
import { UserAccountService } from '../services/user_account/user_account.service'
import { type IUserAccountRestController } from './interface'
import { HttpStatusCode } from 'axios'

export default class UserAccountRestController implements IUserAccountRestController {
  private readonly userAccountService: IUserAccountService
  private readonly userAccountRepository = new UserAccountRepository()
  private readonly userRepository = new UserRepository()
  constructor () {
    this.userAccountService = new UserAccountService(this.userAccountRepository, this.userRepository)
  }

  async createUserAccount (req: Request, res: Response, next: NextFunction): Promise<any> {
    const data = await this.userAccountService.createUserAccount(req.body as ICreateUserAccountInput)
    res.status(HttpStatusCode.Ok).json({
      status: 'SUCCESS',
      data
    })
  }

  async login (req: Request, res: Response, next: NextFunction): Promise<any> {
    const username = req.body.username
    const password = req.body.password
    try {
      const data = await this.userAccountService.login(username as string, password as string)
      res.status(HttpStatusCode.Ok).json({
        status: 'SUCCESS',
        data
      })
    } catch (error) {
      next(error)
    }
  }
}
