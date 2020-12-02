type ErrorType = {
    code: number,
    statusCode: number,
    message: string
}

export default {
    EMAIL_ALREADY_IN_USE: {
        code: 0x101,
        statusCode: 400,
        message: 'email already in use'
    },
    INVALID_PASSWORD: {
        code: 0x102,
        statusCode: 400,
        message: 'invalid password'
    },
    USER_NOT_FOUND: {
        code: 0x103,
        statusCode: 400,
        message: 'user not found'
    },
    USER_NOT_CONFIRMED: {
        code: 0x104,
        statusCode: 401,
        message: 'user not confirmed'
    },
    USER_ALREADY_CONFIRMED: {
        code: 0x105,
        statusCode: 400,
        message: 'user already confirmed'
    },
    INVALID_CONFIRMATION_CODE: {
        code: 0x109,
        statusCode: 400,
        message: 'invalid confirmation code'
    },

    ALREADY_SIGNED_IN: {
        code: 0x110,
        statusCode: 400,
        message: 'already signed in'
    },


    VALIDATION_ERROR: {
        code: 0x200,
        statusCode: 400,
        message: 'validation error'
    },

    TOKEN_REQUIRED: {
        code: 0x300,
        statusCode: 401,
        message: 'token required'
    },
    INVALID_TOKEN: {
        code: 0x301,
        statusCode: 400,
        message: 'invalid token'
    },

    UNAUTHORIZED: {
        code: 0x401,
        statusCode: 401,
        message: 'unauthorized'
    },
    BAD_REQUEST: {
        code: 0x400,
        statusCode: 400,
        message: 'bad request'
    }


}

export class RestError extends Error {

    public code: number
    public statusCode: number
    public message: string
    public values: string[]

    constructor(error: ErrorType, values?: string[], message?: string) {
        super()
        this.code = error.code
        this.statusCode = error.statusCode
        this.message = message || error.message
        this.values = values || []
    }

    toJSON() {
        return {
            error: true,
            code: this.code,
            message: this.message,
            values: this.values
        }
    }

    toString() {
        return `Error (0x${this.code.toString(16)}): ${this.message} on following values: ${this.values.join(', ')}`
    }

}