import mongo from '@/database/mongo'
import config from '@/config'
import mongoose from 'mongoose'


describe('Mongo', () => {
    it('should connect', async () => {
        const connection = await mongo.connect(config.MONGO_URI)
        expect(connection).toBeTruthy()
    })
})