const express = require('express');
const {body, validationResult} = require('express-validator');
const taskRouter = express.Router();

const {
    handleGetTask,
    handlePostTask,
    handlePatchTask,
    handleDeleteTask
} = require("./tasks.controller");
const {StatusCodes} = require("http-status-codes");

taskRouter.get('/tasks', handleGetTask)
taskRouter.post('/tasks', [
        body('title', 'The Title can not be empty!').notEmpty(),
        body('title', 'Title must be a string!').isString(),
        body('dueDate', 'dueDate needs to be valid ISO8601 string').notEmpty().isISO8601(),
    ],
    (req, res) => {
        const result = validationResult(req);
        if (result.isEmpty()) {
            return handlePostTask(req, res)
        } else {
            return res.status(StatusCodes.BAD_REQUEST).json(result.array())
        }
    })
taskRouter.patch('/tasks', handlePatchTask)
taskRouter.delete('/tasks', handleDeleteTask)


module.exports = taskRouter;
