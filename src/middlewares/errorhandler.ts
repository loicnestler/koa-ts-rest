import { RestError } from "@/lib/errors"
import { Context } from "koa"

export default function ErrorHandler() {

    return async (ctx: Context, next: Function) => {
        try {
            await next()
            if (!ctx.body) {
                ctx.status = 404
                ctx.body = { error: true, message: 'not found' }
            }
            if (!ctx.body?.error) {
                ctx.body.error = false
            }
        } catch (err: RestError | any) {
            if (err instanceof RestError) {

                ctx.status = err.statusCode
                return ctx.body = err.toJSON()
            }

            console.log(err)
        }
    }

}