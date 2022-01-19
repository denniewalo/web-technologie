const mongoose = require('mongoose')

const saltSchema = mongoose.Schema({
    id:     { type: String, require: true },
    salt:   { type: String, require: true }
})


const SaltSchema = module.exports = mongoose.model('salt', saltSchema)

module.exports.get = function (callback, limit) {
    SaltSchema.find(callback).limit(limit)
}