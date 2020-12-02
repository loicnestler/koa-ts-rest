import errors, { RestError } from "@/lib/errors"
import { ValidationError } from "joi"
import { Context } from "koa"

export default function ValidationErrorHandler() {

    return async (ctx: Context, next: Function) => {
        try {
            await next()
        } catch (err: ValidationError | any) {
            if (err.isJoi) throw new RestError(errors.VALIDATION_ERROR, [err.msg.replace(/[\[\]]/g, '')])
            throw err
        }
    }

}