import jwt, { type JwtPayload, type VerifyErrors } from 'jsonwebtoken'
import { type NextFunction, type Request, type Response } from 'express'
import { AUTH_ACCESS_SERCRET_KEY } from '../common/constant'
import { GraphQLError } from 'graphql'

const WHITE_LIST_APIS = ['/api/user/v1/register', '/api/auth/v1/login', '/api/auth/v1/token/access', '/api/auth/v1/logout']
const WHITE_LIST_GRAPHQL_OPERATIONS = ['Login', 'SubgraphIntrospectQuery', 'IntrospectionQuery']
const GRAPHQL_PATH = '/graphql'

export const graphqlAuthenticate = (req: Request, res: Response, next: NextFunction): void => {
  const operationName: string = req.body.operationName
  if (operationName === '') {
    throw new GraphQLError('Authentication failed', {
      extensions: { code: 'AuthenticationFailed' }
    })
  }
  if (WHITE_LIST_GRAPHQL_OPERATIONS.includes(operationName) || req.originalUrl !== GRAPHQL_PATH) {
    next()
    return
  }

  const token: string = req.headers.authorization ?? ''
  if (token === '') {
    throw new GraphQLError('Authentication failed', {
      extensions: { code: 'AuthenticationFailed' }
    })
  }

  jwt.verify(token, AUTH_ACCESS_SERCRET_KEY, function (err: VerifyErrors, decoded: JwtPayload) {
    // eslint-disable-next-line
    if (err) {
      if (err.name === 'TokenExpiredError') {
        throw new GraphQLError('Authentication failed', {
          extensions: { code: 'AuthenticationFailed' }
        })
      }

      throw new GraphQLError('Authentication failed', {
        extensions: { code: 'AuthenticationFailed' }
      })
    }

    res.locals.account = { ...decoded }
    next()
  })
}

export const restAuthenticate = (req: Request, res: Response, next: NextFunction): void => {
  if (WHITE_LIST_APIS.includes(req.originalUrl) || req.originalUrl === GRAPHQL_PATH) {
    next()
    return
  }

  const token: string = req.headers.authorization ?? ''
  if (token === '') {
    throw new Error('Authentication failed')
  }

  jwt.verify(token, AUTH_ACCESS_SERCRET_KEY, function (err: VerifyErrors, decoded: JwtPayload) {
    // eslint-disable-next-line
    if (err) {
      if (err.name === 'TokenExpiredError') {
        throw new Error('TokenExpiredError')
      }

      throw new Error('TokenExpiredError')
    }

    res.locals.account = { ...decoded }
    next()
  })
}
