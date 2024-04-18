import express, { type Router } from 'express'
import { createAuthRoute } from './user_account.route'

export const createRootRoute = (): Router => {
  const router = express.Router()

  router.use('/user_accounts', createAuthRoute())

  return router
}
