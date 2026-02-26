const {matchedData} = require("express-validator");
const errorLogger = require("../../helpers/errorLogger.helper");
const {StatusCodes} = require("http-status-codes");
const User = require("../../users/user.schema");
const {compare} = require("bcrypt");
const generateTokenProvider = require("./generateToken.provider");

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

        const token = generateTokenProvider(user);

        return res.status(StatusCodes.OK).json({
            accessToken: token, firstName: user.firstName, lastName: user.lastName, email: user.email
        });
    } catch (error) {
        errorLogger("Error while login:", req, error);
        return res.status(StatusCodes.BAD_REQUEST).json({reason: 'Failed to login'});
    }
}

module.exports = authProvider;
