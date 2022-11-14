const {userService} = require("../service");
const User = require('../DB/User')
const {Api_error} = require("../error/ApiError");
const userValidator = require('../validator/user.validator');
const commonValidator = require('../validator/common.validator');


module.exports = {
    getUserDynamically: (fieldName, from = 'body', dbField = fieldName) => async (req, res, next) => {
        try {
            const fieldToSearch = req[from][fieldName];

            const user = await User.findOne({[dbField]: fieldToSearch});

            if (!user) {
                throw  new Api_error('User not found', 503);
            }

            req.user = user;

            next()
        } catch (e) {
            next(e)
        }
    },

    checkIsEmailUnique: async (req, res, next) => {
        try {
            const {email} = req.body;

            if (!email) {
                throw new Api_error('email not present', 400);
            }

            const user = await userService.findOneByParams({email});

            if (user) {
                throw  new Api_error('User with this email already exist', 409);
            }

            next();
        } catch (e) {
            next(e)
        }
    },

    isNewUserValid: async (req, res, next) => {
        try {
            const validate = userValidator.newUserValidator.validate(req.body);

            if (validate.error) {
                throw new Api_error(validate.error.message, 400)
            }

            req.body = validate.value;

            next()
        } catch (e) {
            next(e)
        }
    },
    isEditUserValid: async (req, res, next) => {
        try {
            const validate = userValidator.editUserValidator.validate(req.body);

            if (validate.error) {
                throw new Api_error(validate.error.message, 400)
            }
            req.body = validate.value;

            next()
        } catch (e) {
            next(e)
        }
    },
    isUserIdValid: async (req, res, next) => {
        try {
            const {userID} = req.params;

            const validate = commonValidator.idValidator.validate(userID);

            if (validate.error) {
                throw new Api_error(validate.error.message, 400);
            }
            next()
        } catch (e) {
            next(e)
        }
    },


}