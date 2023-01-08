const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')
const validationUserMiddleware = require('../middlewares/validationMidleware')

/* GET users listing. */
router.get('/', userController.getUsers);

router.get('/:id', userController.getUserById);

router.post('/', validationUserMiddleware, userController.createUser);

router.put('/:id', validationUserMiddleware, userController.updateUser);

router.patch('/:id', validationUserMiddleware, userController.patchUser);

router.delete('/:id', userController.deleteUser);

module.exports = router;
