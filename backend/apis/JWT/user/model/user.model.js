const mongoose = require('mongoose')
const { stringify } = require('uuid')

const userSchema = mongoose.Schema({
    id: { type: String, require: true },
    fullname: { type: String, require: true },
    username: { type: String, require: true },
    password: { type: String, require: true },
    role: { type: String, require: true },
    accesToken: {type: String, reguire: true}
})


const User = module.exports = mongoose.model('user', userSchema)

module.exports.get = function (callback, limit) {
  User.find(callback).limit(limit)
}