const {body, validationResult} = require('express-validator');
const {StatusCodes} = require("http-status-codes");

const createTaskValidator = [
    body('title', 'The Title can not be empty!').notEmpty(),
    body('title', 'Title must be a string!').isString(),
    body('title', 'Title must be between 3 and 100 characters').isLength({min: 3, max: 100}),
    body('title').trim(),
    body('dueDate', 'dueDate needs to be valid ISO8601 string').notEmpty().isISO8601(),
    body('description', "The description can not be empty").notEmpty().isString().trim(),
    body('description', "The description must be between 3 and 500 characters").isLength({min: 3, max: 500}),
    body('priority').isIn(['low', 'normal', 'high']),
    body('status').isIn(['todo', 'inProgress', 'completed']).trim(),
    body('user').notEmpty().isMongoId(),
];

module.exports = createTaskValidator;
