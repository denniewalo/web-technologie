const router = require('express').Router()

router.get('/', function (req, res) {
    res.json({
        status: "Login Api works",
        message: 'Say Hi to your beautiful API, Digga!'
    })
})

/*router.get('/register', function (req, res) {
    res.json({
        status: "Register Api works",
        message: 'Thats the niceste register api ever!'
    })
})*/

const userController = require('./user/controller/user.controller')

router.route('/register')
.post(userController.register)

router.route('/login')
.post(userController.login)

router.route('/refresh')
.post(userController.refreshToken)

router.route('/logout')
.post(userController.logout)

module.exports = router;