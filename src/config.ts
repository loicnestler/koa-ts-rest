import 'module-alias/register'

import env from 'dotenv'
env.config()

interface IConfig {
    PORT: number
    MONGO_URI: string
    ENV: string
    JWT_SECRET_KEY: string
    APP_URL: string
}

export default <IConfig>{
    PORT: process.env.NODE_ENV === 'test' ? 30999 : process.env.PORT || 3001,
    MONGO_URI: process.env.NODE_ENV === 'test' ? 'mongodb://localhost:27017/_test' : process.env.MONGO_URI || 'mongodb://localhost:27017/example',
    ENV: process.env.NODE_ENV || 'production',
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY || 'secret_key',
    APP_URL: process.env.APP_URL || 'http://localhost:3000'
}
