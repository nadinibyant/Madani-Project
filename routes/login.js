const express = require('express')
const router = express.Router()
const controllers = require('../controllers/login')

router.get('/', controllers.indexView)
router.get('/about', controllers.aboutView)
router.get('/program', controllers.programView)
router.get('/login', controllers.loginView)
router.post('/login', controllers.login)

module.exports = router
