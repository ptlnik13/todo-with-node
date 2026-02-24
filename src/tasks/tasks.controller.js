const Task = require('./task.schema');
const {StatusCodes} = require("http-status-codes");

function handleGetTask(req, res) {
    let response = [
        {
            title      : "Title Of the Task",
            date       : "2025-01-01T12:00:00Z",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lobortis diam vel malesuada ultricies.",
            priority   : "normal",
            status     : "todo",
        },
        {
            title      : "Title Of the Task 2",
            date       : "2025-01-01T12:00:00Z",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lobortis diam vel malesuada ultricies.",
            priority   : "normal",
            status     : "inProgress",
        },
    ];
    res.json(response);
}

async function handlePostTask(req, res) {
    const task = new Task({
        title      : req.body.title,
        description: req.body.description,
        status     : req.body.status,
        priority   : req.body.priority,
        dueDate    : req.body.dueDate
    });

    await task.save();
    res.status(StatusCodes.CREATED).json(task);
}

function handlePatchTask(req, res) {
    res.send('PATCH Task Controller');
}

function handleDeleteTask(req, res) {
    res.send('DELETE Task Controller');
}

module.exports = {handleGetTask, handlePostTask, handlePatchTask, handleDeleteTask};
