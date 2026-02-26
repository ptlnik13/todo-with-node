const {body} = require('express-validator');


const authValidator = [
    body('email', 'Email is required').notEmpty().isEmail().trim(),
    body('password', 'Password is required').notEmpty().isLength({min: 8}).isString(),
]


module.exports = authValidator;
