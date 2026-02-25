const Task = require("../task.schema");
const {matchedData} = require("express-validator");
const {StatusCodes} = require("http-status-codes");
const errorLogger = require("../../helpers/errorLogger.helper");

async function deleteTaskProvider(req, res) {
    const validatedResult = matchedData(req);
    try {
        const task = await Task.deleteOne({_id: req.body["_id"]});
        return res.status(StatusCodes.OK).json(task);
    } catch (error) {
        errorLogger("Error while deleting task:", req, error);
        return res.status(StatusCodes.GATEWAY_TIMEOUT).json({reason: 'Failed to delete task'});
    }
}

module.exports = deleteTaskProvider;
