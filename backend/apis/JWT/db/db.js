const mongoose  = require('mongoose')
require('dotenv').config()




const connectDB = async () => {
    try {
        const conn = mongoose.connect(process.env.DB_USERS, {
            useNewUrlParser: true
        })

        console.log(`MongoDB connected to ${process.env.DB_USERS}`)
    } catch (err) {
        console.error(err)
        process.exit(1)
    }
}

module.exports = connectDB