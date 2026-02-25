const Task = require("../task.schema");
const {matchedData} = require("express-validator");
const {StatusCodes} = require("http-status-codes");
const {errorLogger} = require("express-winston");

async function updateTaskProvider(req, res) {
    const validatedData = matchedData(req);
    try {
        //fetch task by id
        const task = await Task.findById(req.body["_id"]);

        //update
        task.title = validatedData.title || task.title;
        task.description = validatedData.description || task.description;
        task.status = validatedData.status || task.status;
        task.priority = validatedData.priority || task.priority;
        task.dueDate = validatedData.dueDate || task.dueDate;
        //save
        await task.save();
        return res.status(StatusCodes.OK).json(task);
    } catch (error) {
        errorLogger("Error while updating task:", req, error);
        return res.status(StatusCodes.GATEWAY_TIMEOUT).json({reason: 'Failed to update task'});
    }

}


module.exports = updateTaskProvider;
