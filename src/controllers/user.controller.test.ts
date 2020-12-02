import request from 'supertest'
import { app } from '@/app'

import faker from 'faker'


describe('User controller', () => {

    const email = faker.internet.email()
    const password = faker.internet.password()

    it('Should signup', async () => {
        const response = await request(app.callback()).post('/user/signup').send({
            email,
            password
        })
        expect(response.status).toBe(200)
        expect(response.body.error).toBeFalsy()


        it('Should be able to login', async () => {
            const response2 = await request(app.callback()).post('/user/login').send({
                email,
                password
            })

            expect(response2.status).toBe(200)
            expect(response2.body.error).toBeFalsy()

            const token = response2.body.token

            it('Should delete', async () => {
                const response3 = await request(app.callback()).delete('/user/').set('Cookie', `token=${token}`).send({
                    password
                })

                expect(response3.status).toBe(200)
                expect(response3.body.error).toBeFalsy()
                expect(response3.body.success).toBeTruthy()

            })
        })
    })

})