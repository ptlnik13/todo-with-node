const User = require("../user.schema");
const {matchedData} = require("express-validator");
const {StatusCodes} = require("http-status-codes");
const errorLogger = require("../../helpers/errorLogger.helper");
const bcrypt = require("bcrypt");

async function createUserProvider(req, res) {

    const validatedResult = matchedData(req);
    try {
        const existingUser = await User.findOne({email: validatedResult.email});
        if (existingUser) return res.status(StatusCodes.CONFLICT).json(
            {reason: "User already exists"}
        )
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(validatedResult.password, salt);
        const {firstName, lastName, email, password} = validatedResult;
        const user = new User({
            firstName, lastName, email, password: hashedPassword
        });

        await user.save()
        return res.status(StatusCodes.CREATED).json({_id: user._id, firstName, lastName, email})
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
