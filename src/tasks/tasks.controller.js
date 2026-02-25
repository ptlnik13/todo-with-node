const {StatusCodes} = require("http-status-codes");
const createTaskProvider = require("./providers/createTask.provider");
const getTasksProvider = require("./providers/getTasks.provider");
const updateTaskProvider = require("./providers/updateTask.provider");
const deleteTaskProvider = require("./providers/deleteTask.provider");

async function handleGetTask(req, res) {
    return await getTasksProvider(req, res);
}

async function handlePostTask(req, res) {
    return await createTaskProvider(req, res);
}

async function handlePatchTask(req, res) {
    return updateTaskProvider(req, res);
}

async function handleDeleteTask(req, res) {
    const deletedTask = await deleteTaskProvider(req, res);
    res.status(StatusCodes.OK).json(deletedTask);
}

module.exports = {handleGetTask, handlePostTask, handlePatchTask, handleDeleteTask};
