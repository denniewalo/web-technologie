const mongoose = require('mongoose')

const adminSchema = mongoose.Schema({
    id:         { type: String, require: true },
    fullname:   { type: String, require: true },
    username:   { type: String, require: true },
    password:   { type: String, require: true },
    saltid:     {type: String, require: true},
    role:       { type: String, require: true }
})


const Admin = module.exports = mongoose.model('admin', adminSchema)

module.exports.get = function (callback, limit) {
  Admin.find(callback).limit(limit)
}