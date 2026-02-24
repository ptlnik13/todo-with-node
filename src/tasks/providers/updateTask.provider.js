const Task = require("../task.schema");

async function updateTaskProvider(req, res) {
    //fetch task by id
    const task = await Task.findById(req.body["_id"]);

    //update
    task.title = req.body.title;
    task.description = req.body.description;
    task.status = req.body.status;
    task.priority = req.body.priority;
    task.dueDate = req.body.dueDate;
    //save
    return await task.save();
}


module.exports = updateTaskProvider;
