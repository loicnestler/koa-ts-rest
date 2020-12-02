import mongoose from 'mongoose'

export default {
    connect(mongoUri: string): Promise<typeof mongoose> {
        return mongoose.connect(mongoUri, { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true })
    },
    disconnect(): Promise<void> {
        return mongoose.disconnect()
    }
}