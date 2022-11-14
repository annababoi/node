
const router = require('express').Router();

const controller = require('../controller/user.controller')

const mdlwr = require('../middleware/user.middleware');

router.get('/',  controller.getAllUsers);

router.post('/', controller.createUser);

router.get('/:userID', mdlwr.checkIsUserExist, controller.getUserById);

router.put('/:userID', mdlwr.checkIsUserExist, controller.updateUser);

router.delete('/:userID',  controller.deleteUser);


module.exports = router;