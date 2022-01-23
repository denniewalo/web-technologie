const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    id:         { type: String, require: true },
    fullname:   { type: String, require: true },
    username:   { type: String, require: true },
    password:   { type: String, require: true },
    saltid:     { type: String, require: true},
    role:       { type: String, require: true }
})


const User = module.exports = mongoose.model('user', userSchema)

module.exports.get = function (callback, limit) {
  User.find(callback).limit(limit)
}