/* eslint @typescript-eslint/no-unsafe-argument: 0 */ // --> OFF
import express, { type Router } from 'express'
import UserAccountRestController from '../controller/account.controller.rest'

export const createAuthRoute = (): Router => {
  const router = express.Router()
  const userController = new UserAccountRestController()

  router.post('/', userController.createUserAccount.bind(userController))
  router.post('/login', userController.login.bind(userController))

  return router
}
