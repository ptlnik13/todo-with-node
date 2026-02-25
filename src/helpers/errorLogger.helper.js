const {StatusCodes} = require("http-status-codes");
const {error} = require("./winston.helper");


function errorLogger(message, req, error) {
    error(`Error while creating task: ${error.message}`, {
        metadata: {
            errorCode: error.code,
            errorName: error.name,
            method   : req.method,
            url      : req.originalUrl,
            query    : req.query,
            params   : req.params,
            error    : error
        }
    });
}

module.exports = errorLogger;
