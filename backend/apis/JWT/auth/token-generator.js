const jwt   = require('jsonwebtoken')

const generateAccessToken = (user) => {
    return jwt.sign(
        { username: user.username, userpw: user.password }, 
        process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30s' })
}

const generateRefreshToken = (user) => {
    return jwt.sign(
        { username: user.username, userpw: user.password, tokenversion: user.tokenversion }, 
        process.env.REFRESH_TOKEN_SECRET, { expiresIn: '3d' })
}


exports.generateAccessToken = generateAccessToken
exports.generateRefreshToken = generateRefreshToken