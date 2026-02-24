const {StatusCodes} = require("http-status-codes");
const Task = require("../task.schema");
const {matchedData} = require('express-validator')

async function createTaskProvider(req, res) {
    //if unwanted data is passed then we will validate and remove unwanted data.
    const validatedResult = matchedData(req);
    const task = new Task(validatedResult);
    return await task.save();
}

module.exports = createTaskProvider;
