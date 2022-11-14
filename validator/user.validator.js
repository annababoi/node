const Joi = require ('joi');
const regexp = require ('../config/regexp.enum')

module.exports = {
    newUserValidator : Joi.object({
        name: Joi.string().min(2).max(40).required().default(''),
        email: Joi.string().regex(regexp.EMAIL).required().lowercase().trim(),
        password: Joi.string().regex(regexp.PASSWORD).required(),
        age: Joi.number().min(1).max(120)
    }),
    editUserValidator : Joi.object({
        name: Joi.string().min(2).max(40).default('').optional(),
        email: Joi.string().regex(regexp.EMAIL).lowercase().trim().optional(),
        age: Joi.number().min(1).max(120).optional()
    })
}

