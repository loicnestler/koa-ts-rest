import { pre, prop, getModelForClass, Ref } from "@typegoose/typegoose"

import mongoose from 'mongoose'


import bcrypt from 'bcrypt'

const SALT_WORK_FACTOR = 10

// enum Role {
//     USER = 'user',
//     ADMIN = 'admin',
//     UNIVERSITY = 'university'
// }

@pre<User>('save', async function save(next) {
    if (!this.isModified('password')) return next()

    try {
        const salt = await bcrypt.genSalt(SALT_WORK_FACTOR)
        this.password = await bcrypt.hash(this.password, salt)
        return next()
    } catch (err) {
        return next(err)
    }
})
class User {


    // TODO: add select: false to some keys
    @prop({ required: true, unique: true })
    public email!: string

    @prop({ required: true })
    public password!: string

    @prop({ default: false })
    public confirmed!: boolean

    // @prop({ enum: Role, default: Role.USER })
    // public role: Role

    // @prop({ default: () => Math.random().toString(26).substr(-6) })
    // public emailVerificationCode?: string

    // @prop()
    // public firstName?: string

    // @prop()
    // public lastName?: string

    @prop({ default: () => new Date() })
    public createdAt!: Date


    public async validatePassword(data: string) {
        return bcrypt.compare(data, this.password)
    }

    // public async createConfirmationCode() {
    //     return this.email + '=%=' + md5(this.emailVerificationCode)
    // }
}

export { User as UserSchema }
export default getModelForClass(User)