const mongoose = require('mongoose')

const refreshTokenSchema = mongoose.Schema({
    userid: { type: String, require: true },
    token: { type: String, require: true }
})


const RefreshToken = module.exports = mongoose.model('refreshToken', refreshTokenSchema)

module.exports.get = function (callback, limit) {
    RefreshToken.find(callback).limit(limit)
}