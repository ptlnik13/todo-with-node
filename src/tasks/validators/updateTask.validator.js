const {body} = require('express-validator');


const updateTaskValidator = [
    body('_id', "Valid document ID is required").notEmpty().isMongoId(),
    body('title').optional().isString().withMessage('Title must be a string').trim(),
    body('title').isLength({min: 3, max: 100}).withMessage('Title must be between 3 and 100 characters'),
    body('dueDate').optional().isISO8601().withMessage('Due date must be a valid date'),
    body('description').optional().isString().withMessage('Description must be a string'),
    body('priority').optional().isIn(['low', 'normal', 'high']).withMessage('Priority must be one of: low, normal,' +
        ' high'),
    body('status').optional().isIn(['todo', 'inProgress', 'completed']).withMessage('Status must be one of: todo, inProgress, completed'),
];

module.exports = updateTaskValidator;
