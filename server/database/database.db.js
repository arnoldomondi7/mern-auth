import mongoose from 'mongoose'
import config from '../config/config.config'

const connetToDb = () => {
    try {
        mongoose.connect(config.mongoUri)

        //log a success message.
        console.log(`**Database Is Connected Successfully**`)
    } catch (error) {
        console.log(`Cannot connect to the database, because of ${error}`)
    }
}

export default connetToDb