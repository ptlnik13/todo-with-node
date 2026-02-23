const express = require('express');
const taskRouter = express.Router();

const {
    handleGetTask,
    handlePostTask,
    handlePatchTask,
    handleDeleteTask
} = require("./tasks.controller");

taskRouter.get('/tasks', handleGetTask)
taskRouter.post('/tasks', handlePostTask)
taskRouter.patch('/tasks', handlePatchTask)
taskRouter.delete('/tasks', handleDeleteTask)


module.exports = taskRouter;
