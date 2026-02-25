const {body} = require('express-validator');

const createUserValidator = [
    body('firstName', 'First name is required').notEmpty().isString().trim(),
    body('lastName', 'Last name is required').optional().notEmpty().isString().trim(),
    body('email', 'Email is required').notEmpty().isEmail().trim(),
    body('password', 'Password is required').notEmpty().isLength({min: 8}).matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/),
]

module.exports = createUserValidator;
