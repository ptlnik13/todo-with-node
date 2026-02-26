const express = require('express');
const {validationResult} = require('express-validator');
const taskRouter = express.Router();
const {handleGetTask, handlePostTask, handlePatchTask, handleDeleteTask} = require("./tasks.controller");
const {StatusCodes} = require("http-status-codes");
const createTaskValidator = require("./validators/createTask.validator");
const getTasksValidator = require("./validators/getTasks.validator");
const updateTaskValidator = require("./validators/updateTask.validator");
const deleteTaskValidator = require("./validators/deleteTask.validator");
const authenticateToken = require("../middlewares/authenticateToken.middleware");

taskRouter.get('/tasks', [getTasksValidator, authenticateToken], (req, res) => {
    const result = validationResult(req);
    if (result.isEmpty()) {
        return handleGetTask(req, res)
    } else {
        return res.status(StatusCodes.BAD_REQUEST).json(result.array())
    }
})
taskRouter.post('/tasks', [createTaskValidator, authenticateToken], (req, res) => {
    const result = validationResult(req);
    if (result.isEmpty()) {
        return handlePostTask(req, res)
    } else {
        return res.status(StatusCodes.BAD_REQUEST).json(result.array())
    }
})
taskRouter.patch('/tasks', [updateTaskValidator, authenticateToken], (req, res) => {
    const result = validationResult(req);
    if (result.isEmpty()) {
        return handlePatchTask(req, res)
    } else {
        return res.status(StatusCodes.BAD_REQUEST).json(result.array())
    }
})
taskRouter.delete('/tasks', [deleteTaskValidator, authenticateToken], (req, res) => {
    const result = validationResult(req);
    if (result.isEmpty()) {
        return handleDeleteTask(req, res)
    } else {
        return res.status(StatusCodes.BAD_REQUEST).json(result.array())
    }
})


module.exports = taskRouter;
