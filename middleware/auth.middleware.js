const authValidator = require('../validator/auth.validator');
const {Api_error} = require("../error/ApiError");
const oauthService = require('../service/oauth.service');
const ActionToken = require('../DB/ActionToken');
const OAuth = require('../DB/OAuth');
const {FORGOT_PASSWORD} = require("../config/token-types.enum");

module.exports = {
    isBodyValid: async (req, res, next) => {
        try {
            const validate = authValidator.loginValidator.validate(req.body);

            if (validate.error) {
                throw new Api_error(validate.error.message, 400);
            }

            next()
        } catch (e) {
            next(e)
        }
    },
    checkAccessToken: async (req, res, next) => {
        try {
            const accessToken = req.get('Authorization');

            if (!accessToken) {
                throw new Api_error('No token', 401);
            }

            oauthService.checkTokens(accessToken);

            const tokenInfo = await OAuth.findOne({ accessToken });

            if (!tokenInfo) {
                throw new Api_error('Token not valid', 401);
            }

            req.tokenInfo = tokenInfo;
            next();
        } catch (e) {
            next(e);
        }
    },
    checkRefreshToken: async (req, res, next) => {
        try {
            const refreshToken = req.get('Authorization');

            if (!refreshToken) {
                throw new Api_error('No token', 401);
            }

            oauthService.checkTokens(refreshToken, 'refreshToken');

            const tokenInfo = await OAuth.findOne({ refreshToken });

            if (!tokenInfo) {
                throw new Api_error('Token not valid', 401);
            }
            req.tokenInfo = tokenInfo;
            next()
        } catch (e) {
            next(e)
        }
    },
    checkActionToken: async (req, res, next) => {
        try {
            const actionToken = req.get('Authorization');

            if (!actionToken) {
                throw new Api_error('No token', 401);
            }

            oauthService.checkActionToken(actionToken, FORGOT_PASSWORD);

            const tokenInfo = await ActionToken
                .findOne({ token: actionToken, tokenType: FORGOT_PASSWORD })
                .populate('_user_id');

            if (!tokenInfo) {
                throw new Api_error('Token not valid', 401);
            }

            req.user = tokenInfo._user_id;

            next();
        } catch (e) {
            next(e);
        }
    },
}