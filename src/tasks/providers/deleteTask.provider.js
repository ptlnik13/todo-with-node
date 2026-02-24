const Task = require("../task.schema");

async function deleteTaskProvider(req, res) {
    return Task.deleteOne({_id: req.body["_id"]});
}

module.exports = deleteTaskProvider;
