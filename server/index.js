require('dotenv').config({override: true})
const express = require('express')
const cors = require('cors')   
const fileUpload = require('express-fileupload')
const router = require('./routes/index')
const path = require('path')    

const sequelize = require('./db')
const models = require('./models/models')
const PORT = process.env.PORT || 5000  
const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))
app.use('/api', router)


const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, ()=> console.log(`Server started on port ${PORT}`))

        console.log('Connection has been established successfully.')
    } catch (error) {
        console.error('Unable to connect to the database:', error)
    }
}     
start(); 
