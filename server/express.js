import express from 'express'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'
import compress from 'compression'
import cors from 'cors'
import { readdirSync } from 'fs'

const morgan = require('morgan')

//initiate the app.
const app = express()

//initiate the middlewares.
app.use(express.json())
app.use(cors())
app.use(helmet())
app.use(cookieParser())
app.use(compress())
app.use(morgan('dev'))

//handle the routes.
readdirSync('./routes').map((route) => app.use('/api', require(`./routes/${route}`)))



//export the app.
export default app