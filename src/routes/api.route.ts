import express, { type Router } from 'express'
import { createAuthRoute } from './user_account.route'

export const createRootRoute = (): Router => {
  const router = express.Router()

  router.use('/auth', createAuthRoute())

  return router
}
