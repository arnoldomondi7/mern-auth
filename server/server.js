import config from './config/config.config'
import app from './express'

//database.
import connetToDb from './database/database.db'
//initiate the databse.
connetToDb()

//listen to the server.
app.listen(config.port, (error) => {
    if (error) {
        return console.log(`Server cannot conet because of ${error}`)
    }

    //log a success message.
    console.log(`Server is Up and Running On Port ${config.port}`)
})
