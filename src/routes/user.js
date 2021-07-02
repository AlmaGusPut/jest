const express = require('express')
const router = express.Router();
const userController = require('../controllers/user')

router.post('/users/create',/* userValidator.authCheck,*/ userController.createUser)
router.get('/users/getAll', /* userValidator.authCheck,*/userController.getAllUser)
router.get('/users/getById/:id',/* userValidator.authCheck,*/ userController.getUserById)
router.patch('/users/updateUser/:id',/* userValidator.authCheck,*/ userController.updateUser)
router.delete('/users/deleteUser/:id',/* userValidator.authCheck,*/ userController.deleteUserById)

module.exports = router