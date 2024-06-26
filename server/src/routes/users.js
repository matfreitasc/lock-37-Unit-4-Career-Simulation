const express = require('express')
const router = express.Router()

const usersController = require('../controllers/usersController')
const verifyJWT = require('../middleware/verifyJWT')

router.use(verifyJWT)
router.route('/').get(usersController.getAllUsers).put(usersController.updateUser)

router
    .route('/:id')
    .get(usersController.getUserById)
    .put(usersController.updateUserById)
    .delete(usersController.deleteUser)

module.exports = router
