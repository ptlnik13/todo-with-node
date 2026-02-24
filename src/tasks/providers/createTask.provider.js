const {StatusCodes} = require("http-status-codes");
const Task = require("../task.schema");
const {matchedData} = require('express-validator')
const logger = require("../../helpers/winston.helper");

async function createTaskProvider(req, res) {
    //if unwanted data is passed then we will validate and remove unwanted data.
    const validatedResult = matchedData(req);
    const task = new Task(validatedResult);
    try {
        await task.save();
        return res.status(StatusCodes.CREATED).json(task);
    } catch (e) {
        logger.error(`Error while creating task: ${e.message}`, {
            metadata: {
                errorCode: e.code,
                errorName: e.name,
                method   : req.method,
                url      : req.originalUrl,
                error    : e
            }
        });
        return res.status(StatusCodes.GATEWAY_TIMEOUT).json({
            reason: "Unable to process at the moment, please try" +
                " again later."
        });
    }
}

module.exports = createTaskProvider;
