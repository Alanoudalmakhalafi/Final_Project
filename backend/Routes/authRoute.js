const express = require('express')
const router = express.Router()
const authController = require('../controllers/authControllers')

router.use(express.json())

router.post('/signup', authController.signup_post)
router.post('/login', authController.login_post)
router.get('/logout', authController.logout_get)

module.exports = router