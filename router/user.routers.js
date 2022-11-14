const router = require('express').Router();

const controller = require('../controller/user.controller')
const mdlwr = require('../middleware/user.middleware');
const oauthMdlwr = require('../middleware/auth.middleware');


router.get(
    '/',
    controller.getAllUsers);

router.post(
    '/',
    mdlwr.isNewUserValid,
    mdlwr.checkIsEmailUnique,
    controller.createUser
);

router.get(
    '/:userID',
    mdlwr.isUserIdValid,
    oauthMdlwr.checkAccessToken,
    mdlwr.getUserDynamically('userID', 'params', '_id'),
    controller.getUserByIdWithCars
);
router.put(
    '/:userID',
    mdlwr.isUserIdValid,
    mdlwr.isEditUserValid,
    oauthMdlwr.checkAccessToken,
    mdlwr.getUserDynamically('userID', 'params', '_id'),
    controller.updateUser
);
router.delete(
    '/:userID',
    mdlwr.isUserIdValid,
    oauthMdlwr.checkAccessToken,
    controller.deleteUser
);


module.exports = router; 