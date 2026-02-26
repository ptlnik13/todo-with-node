const {matchedData} = require("express-validator");
const errorLogger = require("../../helpers/errorLogger.helper");
const {StatusCodes} = require("http-status-codes");

async function authProvider(req, res) {
    const validateData = matchedData(req);

    try {

        return res.status(StatusCodes.OK).json({});
    } catch (error) {
        errorLogger("Error while login:", req, error);
        return res.status(StatusCodes.FORBIDDEN).json({reason: 'Failed to login'});
    }
}

module.exports = authProvider;
