const User = require("../user.schema");
const {matchedData} = require("express-validator");
const {StatusCodes} = require("http-status-codes");
const errorLogger = require("../../helpers/errorLogger.helper");

async function createUserProvider(req, res) {

    const validatedResult = matchedData(req);
    try {
        const {firstName, lastName, email, password} = validatedResult;
        const user = new User({
            firstName, lastName, email, password
        });

        await user.save()
        delete user.password; // not returning password back to client, not required.
        return res.status(StatusCodes.CREATED).json(user)
    } catch (e) {
        errorLogger(`Error while creating user: ${e.message}`, req, e)
        return res.status(StatusCodes.GATEWAY_TIMEOUT).json({
                reason: "Unable to process at the moment, please try" +
                    " again later."
            }
        )
    }


}


module.exports = createUserProvider;
