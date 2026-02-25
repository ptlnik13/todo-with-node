const {query, param} = require('express-validator');

const getTasksValidator = [
    query('limit', 'Limit must be a number').optional().isInt().toInt(),
    query('page', 'Page must be a number').optional().isInt().toInt(),
    query('order', "Order must be a ['asc', 'desc']").optional().isIn(['asc', 'desc']),
]


module.exports = getTasksValidator
