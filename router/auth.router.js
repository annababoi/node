const router = require ('express').Router();

const authMdlwr = require('../middleware/auth.middleware');
const mdlwr = require('../middleware/user.middleware')
const controller = require('../controller/auth.controller');

router.post('/login', authMdlwr.isBodyValid, mdlwr.getUserDynamically('email'), controller.login);

router.post('/refresh', authMdlwr.checkRefreshToken, controller.refresh);

router.post('/logout', authMdlwr.checkAccessToken, controller.logout);
router.post('/logoutAll', authMdlwr.checkAccessToken, controller.logoutAll);

router.post('/password/forgot', mdlwr.getUserDynamically('email'), controller.forgotPassword);
router.put('/password/forgot', authMdlwr.checkActionToken, controller.setPasswordAfterForgot);

module.exports = router;