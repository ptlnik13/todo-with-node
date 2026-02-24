const User = require("../user.schema");

async function createUserProvider(req, res) {
    const {firstName, lastName, email, password} = req.body;
    const user = new User({
        firstName, lastName, email, password
    });

    return user.save()
}


module.exports = createUserProvider;
