import mongoose from 'mongoose'
import * as dotenv from 'dotenv'
dotenv.config()

 export default mongoose.connect(process.env.MONGODB_URL, {
        useNewUrlParser: true, })

        const connection = mongoose.connection;
