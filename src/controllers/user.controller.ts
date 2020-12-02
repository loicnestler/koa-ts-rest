import { Context } from "koa"
import { Controller, Get, KoaController, Post, Pre, Validate, Validator } from "koa-joi-controllers"
const Joi = Validator.Joi

import User from "@/models/user.model"

import jwt from '@/helpers/jwt'

import errors, { RestError } from "@/lib/errors"
// import md5 from "md5"

@Controller('/user')
class UserController extends KoaController {

    @Post('/signup')
    @Validate({
        type: 'json',
        body: {
            email: Joi.string().email().required(),
            password: Joi.string().min(8).required()
        },
    })
    async createUser(ctx: Context) {
        try {
            const user = await new User(ctx.request.body).save()
            // console.log(`${user.email}=%=${md5(user.emailVerificationCode)}`)
            return ctx.ok({ token: jwt.compose({ _id: user._id, confirmed: user.confirmed }) })

        } catch (err) {
            if (err.code === 11000) throw new RestError(errors.EMAIL_ALREADY_IN_USE, [err.keyValue.email])
            throw err
        }
    }


    @Post('/login')
    @Validate({
        type: 'json',
        body: {
            email: Joi.string().email().required(),
            password: Joi.string().min(8).required()
        }
    })
    @Pre(jwt.hasJWT)
    async login(ctx: Context) {
        if (ctx.hasToken) throw new RestError(errors.ALREADY_SIGNED_IN)

        const user = await User.findOne({ email: ctx.request.body.email })
        if (!user) throw new RestError(errors.USER_NOT_FOUND, [ctx.request.body.email])

        const isCorrectPassword = await user.validatePassword(ctx.request.body.password)

        if (isCorrectPassword) return ctx.ok({ token: jwt.compose({ _id: user._id, confirmed: user.confirmed }) })

        throw new RestError(errors.INVALID_PASSWORD)
    }

    // @Get('/confirm/:code')
    // async confirm(ctx: Context) {
    //     const [email, code] = ctx.request.params.code.split('=%=')
    //     if ((!email) || (!code)) throw new TeesisError(errors.INVALID_CONFIRMATION_CODE)

    //     const user = await User.findOne({ email }, { email: 1, emailVerificationCode: 1, confirmed: 1 })
    //     if (!user) throw new TeesisError(errors.USER_NOT_FOUND, [email])

    //     if (user.confirmed) throw new TeesisError(errors.USER_ALREADY_CONFIRMED)

    //     if (code !== md5(user.emailVerificationCode)) throw new TeesisError(errors.INVALID_CONFIRMATION_CODE)

    //     user.confirmed = true
    //     await user.save()

    //     return ctx.ok({ token: jwt.compose({ _id: user._id, confirmed: user.confirmed }) })
    // }

    // @Get('/resend-code')
    // @Pre(jwt.withJWT)
    // async resendCode(ctx: Context) {
    //     if (ctx.tokenData.confirmed) throw new TeesisError(errors.USER_ALREADY_CONFIRMED)

    //     console.log('')
    //     // TODO: resend code
    // }

}

export default UserController