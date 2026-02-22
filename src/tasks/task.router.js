const express = require('express');
const taskRouter = express.Router();


taskRouter.get('/tasks',
    (req, res) =>
        res.send('Tasks'))
taskRouter.post('/tasks',
    (req, res) =>
        res.send('Create a new Task'))


module.exports = taskRouter;
