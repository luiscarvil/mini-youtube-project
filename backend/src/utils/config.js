import * as dotenv from 'dotenv'
dotenv.config()
export const config = {
    port: process.env.API_PORT || 3000,
    host: process.env.APP_HOST 
}