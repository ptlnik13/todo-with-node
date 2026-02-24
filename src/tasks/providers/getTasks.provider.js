const Task = require("../task.schema");
const {matchedData} = require('express-validator');
const {StatusCodes} = require("http-status-codes");
const errorLogger = require("../../helpers/errorLogger.helper");


async function getTasksProvider(req, res) {
    const query = matchedData(req);
    try {
        const tasks = await Task.find();
        return res.status(StatusCodes.OK).json(tasks);
    } catch (error) {
        errorLogger("Error while fetching tasks:", req, error);
        return res.status(StatusCodes.GATEWAY_TIMEOUT).json({reason: 'Failed to fetch tasks'});
    }
}

module.exports = getTasksProvider;
