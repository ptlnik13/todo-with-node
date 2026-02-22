const express = require('express');
const taskRouter = express.Router();


taskRouter.get('/tasks',
    (req, res) => {
        return res.send('Tasks')
    })
taskRouter.post('/tasks',
    (req, res) => {
        console.log(req.body)
        return res.send('Create a new Task')
    });


module.exports = taskRouter;
