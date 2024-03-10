import express from 'express'

import userAccountRouterHandler from './user_account.route'

const router = express.Router()

router.use('/user_accounts', userAccountRouterHandler)

export default router
