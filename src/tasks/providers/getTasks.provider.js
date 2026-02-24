const Task = require("../task.schema");

async function getTasksProvider(req, res) {
    return await Task.find();
}

module.exports = getTasksProvider;
