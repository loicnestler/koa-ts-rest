import request from 'supertest'
import { thread, app } from './app'


// beforeAll(async () => {
//     await thread
// })

describe('Server', () => {
    it('should start', async () => {
        const response = await request(app.callback()).get('/')
        expect(response.status).toBeGreaterThan(1)
    })

    it('should throw 404 on /', async () => {
        const response = await request(app.callback()).get('/')
        expect(response.status).toBe(404)
        expect(response.text).toMatchSnapshot()

    })
})

// test('Server', async () => {
//     describe('should start', () => {

//     })
// })