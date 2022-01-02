require('dotenv').config()
const express = require('express')
const sequelize = require('./db')
const models = require('./models/models')
const fileUpload = require('express-fileupload')
const cors = require('cors')
const router = require('./routes')
const ErrorHandler = require('./middleware/ErrorHandler')
const path = require('path')

const PORT = process.env.PORT || 4999

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static'))) //getting static pics from server in static folder
app.use(fileUpload({}))
app.use('/api', router)

//Error handling at the last place without next()
app.use(ErrorHandler)

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    } catch (error) {
    }
}

start()