const authProvider = require('./providers/auth.provider');

async function handleLogin(req, res) {
    return await authProvider(req, res);
}


module.exports = {handleLogin};
