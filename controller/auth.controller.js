const oauthService = require('../service/oauth.service');
const emailService = require('../service/email.service');
const ActionToken = require('../DB/ActionToken');
const OAuth = require('../DB/OAuth');
const User = require('../DB/User');
const {WELCOME, FORGOT_PASS} = require("../config/email-actions");
const {FORGOT_PASSWORD} = require("../config/token-types.enum");
const {FRONTEND_URL} = require("../config/config");


module.exports = {
    login: async (req, res, next) => {
        try {
            const {user, body} = req;

            await emailService.sendEmail('aniapavliuk97@gmail.com', WELCOME);

            await oauthService.comparePassword(user.password, body.password);

            const tokenPair = oauthService.generateAccessTokenPair({id: user._id});

            await OAuth.create({...tokenPair, _user_id: user._id})

            res.json({
                user,
                ...tokenPair
            });
        } catch (e) {
            next(e)
        }
    },
    refresh: async (req, res, next) => {
        try {
            const {refreshToken, _user_id} = req.tokenInfo;

            await OAuth.deleteOne({refreshToken})

            const tokenPair = oauthService.generateAccessTokenPair({id: _user_id});

            await OAuth.create({...tokenPair, _user_id})

            res.status(201).json(tokenPair);
        } catch (e) {
            next(e)
        }
    },

    logout: async (req, res, next) => {
        try {
            const {accessToken} = req.tokenInfo;

            await OAuth.deleteOne({accessToken})

            res.sendStatus(204);

        } catch (e) {
            next(e)
        }
    },

    logoutAll: async (req, res, next) => {
        try {
            const {_user_id} = req.tokenInfo;

            await OAuth.deleteMany({_user_id})

            res.sendStatus(204);
        } catch (e) {
            next(e)
        }
    },
    forgotPassword: async (req, res, next) => {
        try {
            const user = req.user

            const actionToken = oauthService.generateActionToken(FORGOT_PASSWORD, { email: user.email });
            const forgotPassFEURL = `${FRONTEND_URL}/password/new?token=${actionToken}`;

            await ActionToken.create({ token: actionToken, tokenType: FORGOT_PASSWORD, _user_ID: user._id })
            await emailService.sendEmail('aniapavliuk97@gmail.com', FORGOT_PASS, { url: forgotPassFEURL} );



            res.json('ok');
        } catch (e) {
            next(e)
        }
    },
    setPasswordAfterForgot: async (req, res, next) => {
        try {
            const { user, body } = req;

            const hashPassword = await oauthService.hashPassword(body.password);

            await ActionToken.deleteOne( { token: req.get('Authorization') });
            await User.updateOne({ _id: user._id }, { password: hashPassword });

            res.json('ok');

        } catch (e) {
            next(e);
        }
    }
}