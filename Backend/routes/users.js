var express = require('express');
var router = express.Router();

const userController = require('../controllers/user.controller')
const validateUser = require('../validations/user.validations')

/* GET users listing. */
router.get('/', userController().userGetHandler)

/* GET users listing. */
router.post('/', validateUser, userController().userCreateHandler)

module.exports = router;
