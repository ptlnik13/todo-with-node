const createUserProvider = require('./providers/createUser.provider.js');
const {StatusCodes} = require("http-status-codes");

async function handleCreateUser(req, res) {
    const user = await createUserProvider(req, res);
    res.status(StatusCodes.CREATED).json(user);
}


module.exports = {handleCreateUser};
