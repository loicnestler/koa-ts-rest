// import { thread } from '@/app'
import mongo from '@/database/mongo'

import config from '@/config'

import User from '@/models/user.model'

import faker from 'faker'

beforeAll(async () => {
    await mongo.connect(config.MONGO_URI)
})

describe('User model', () => {
    const email = faker.internet.email()
    const password = faker.internet.password()

    it('Should create a new one', async () => {
        const user = await new User({ email, password }).save()
        expect(user.email).toMatch(email)
        expect(user.confirmed).toBeFalsy()
    })


    it('Should delete', async () => {
        const user = await User.deleteOne({ email })
        expect(user.ok).toBeTruthy()
    })
})