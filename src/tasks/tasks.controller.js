const {StatusCodes} = require("http-status-codes");
const createTaskProvider = require("./providers/createTask.provider");
const getTasksProvider = require("./providers/getTasks.provider");
const updateTaskProvider = require("./providers/updateTask.provider");

async function handleGetTask(req, res) {
    let tasks = await getTasksProvider(req, res);
    res.status(StatusCodes.OK).json(tasks);
}

async function handlePostTask(req, res) {
    const task = await createTaskProvider(req, res);
    res.status(StatusCodes.CREATED).json(task);
}

async function handlePatchTask(req, res) {
    const updatedTask = await updateTaskProvider(req, res);
    res.status(StatusCodes.OK).json(updatedTask);
}

function handleDeleteTask(req, res) {
    res.send('DELETE Task Controller');
}

module.exports = {handleGetTask, handlePostTask, handlePatchTask, handleDeleteTask};
