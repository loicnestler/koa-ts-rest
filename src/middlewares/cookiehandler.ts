import { Context } from "koa"

export default function CookieHandler() {

    return async (ctx: Context, next: Function) => {
        await next()
        if (ctx.body?.token) {
            ctx.cookies.set('token', ctx.body.token)
        }
    }

}