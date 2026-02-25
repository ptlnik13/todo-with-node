const createUserProvider = require('./providers/createUser.provider.js');
const {StatusCodes} = require("http-status-codes");

async function handleCreateUser(req, res) {
    return createUserProvider(req, res);
}


module.exports = {handleCreateUser};
