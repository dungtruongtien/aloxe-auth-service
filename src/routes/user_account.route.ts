/* eslint "@typescript-eslint/no-misused-promises": 0 */ // --> OFF
/* eslint @typescript-eslint/unbound-method: 0 */ // --> OFF
/* eslint @typescript-eslint/no-unsafe-argument: 0 */ // --> OFF

import express from 'express'
import UserAccountRestController from '../controller/account.controller.rest'
const router = express.Router()

const userController = new UserAccountRestController()

router.post('/', userController.createUserAccount.bind(userController))

export default router
