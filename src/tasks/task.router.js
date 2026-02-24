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
const createTaskValidator = require("./validators/createTask.validator");

taskRouter.get('/tasks', handleGetTask)
taskRouter.post('/tasks', createTaskValidator, (req, res) => {
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
