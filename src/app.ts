import config from './config'

import Koa, { Context } from 'koa'
import KoaRespond from 'koa-respond'
import KoaLogger from 'koa-logger'
import KoaPinoLogger from 'koa-pino-logger'

import mongo from '@/database/mongo'

import { configureRoutes } from 'koa-joi-controllers'

import CookieHandler from '@/middlewares/cookiehandler'
import ErrorHandler from '@/middlewares/errorhandler'
import ValidationErrorHandler from '@/middlewares/validation-errorhandler'

import UserController from '@/controllers/user.controller'

// console.log(config.ENV)
const app: Koa = new Koa()
// app.use(ValidationErrorHandler())
app.use(config.ENV === 'development' ? KoaLogger() : config.ENV === 'test' ? async (ctx: Context, next: Function) => await next() : KoaPinoLogger())
app.use(KoaRespond())

app.use(CookieHandler())
app.use(ErrorHandler())
app.use(ValidationErrorHandler())


// TODO: add ratelimit middleware

configureRoutes(app, [
    new UserController,
])

const thread = mongo.connect(config.MONGO_URI).then(() => {
    console.log(`✅ Successfully connected to MongoDB`)
    app.listen(config.PORT, () => {
        console.log(`🚀 Listening on :${config.PORT}...`)
    })
}).catch(err => {
    console.log(err)
})

export { thread, app }