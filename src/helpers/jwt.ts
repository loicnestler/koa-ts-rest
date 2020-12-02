import config from '@/config'
import errors, { RestError } from '@/lib/errors'

import jsonwebtoken, { JsonWebTokenError } from 'jsonwebtoken'
import { Context } from 'koa'

const compose = (data: object, options: jsonwebtoken.SignOptions = { expiresIn: '2d' }) => {
    return jsonwebtoken.sign(data, config.JWT_SECRET_KEY, options)
}

const withJWT = async (ctx: Context, next: Function) => {
    let token = ctx.cookies?.get('token') || ctx.query?.token || ''
    token = token.startsWith('Bearer ') ? token.replace('Bearer ', '') : token

    if (!token) throw new RestError(errors.TOKEN_REQUIRED)

    try {
        const tokenData = jsonwebtoken.verify(token, config.JWT_SECRET_KEY)
        ctx.tokenData = tokenData
        return await next()
    } catch (err) {
        if (err instanceof JsonWebTokenError) throw new RestError(errors.INVALID_TOKEN)
        throw err
    }

}

const withConfirmedJWT = async (ctx: Context, next: Function) => {
    let token = ctx.cookies?.get('token') || ctx.query?.token || ''
    token = token.startsWith('Bearer ') ? token.replace('Bearer ', '') : token

    if (!token) throw new RestError(errors.TOKEN_REQUIRED)

    try {
        const tokenData = jsonwebtoken.verify(token, config.JWT_SECRET_KEY)
        ctx.tokenData = tokenData
        if (!ctx.tokenData.confirmed) throw new RestError(errors.USER_NOT_CONFIRMED)
        return await next()
    } catch (err) {
        if (err instanceof JsonWebTokenError) throw new RestError(errors.INVALID_TOKEN)
        throw err
    }
}

const hasJWT = async (ctx: Context, next: Function) => {
    let token = ctx.cookies?.get('token') || ctx.query?.token || ''
    token = token.startsWith('Bearer ') ? token.replace('Bearer ', '') : token

    if (!token) {
        ctx.hasToken = false
        return await next()
    }

    try {
        jsonwebtoken.verify(token, config.JWT_SECRET_KEY)
        ctx.hasToken = true
        return await next()
    } catch (err) {
        if (err instanceof JsonWebTokenError) return ctx.hasToken = false
        throw err
    }
}

export default { withJWT, withConfirmedJWT, hasJWT, compose }