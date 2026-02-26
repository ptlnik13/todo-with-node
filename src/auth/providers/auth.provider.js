const {matchedData} = require("express-validator");
const errorLogger = require("../../helpers/errorLogger.helper");
const {StatusCodes} = require("http-status-codes");
const User = require("../../users/user.schema");
const {compare} = require("bcrypt");

async function authProvider(req, res) {
    const validateData = matchedData(req);

    try {
        // get user from DB
        const user = await User.findOne({email: validateData.email});
        //compare hash
        const result = await compare(validateData.password, user.password);
        if (!result) {
            return res.status(StatusCodes.BAD_REQUEST).json({reason: 'Invalid credentials'});
        }

        return res.status(StatusCodes.OK).json({login: true});
    } catch (error) {
        errorLogger("Error while login:", req, error);
        return res.status(StatusCodes.BAD_REQUEST).json({reason: 'Failed to login'});
    }
}

module.exports = authProvider;
