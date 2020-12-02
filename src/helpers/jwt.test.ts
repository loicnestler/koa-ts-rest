import jwt from '@/helpers/jwt'

describe('JWT Helper', () => {
    it('Should decode to timestamp', async () => {
        const timestamp = Date.now()
        const token = jwt.compose({ timestamp })

        interface ITokenData {
            timestamp: number
        }

        const tokenData = jwt.verify(token)
        if (tokenData instanceof String) return
        expect(tokenData).toBeInstanceOf(Object)
        expect((tokenData as ITokenData).timestamp).toEqual(timestamp)
    })
})