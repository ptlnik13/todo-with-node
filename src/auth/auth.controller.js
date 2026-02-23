function handleLogin(req, res) {
    // res.send('Login')
    res.json({token: 'Hello', user: 'Nikesh'});
}


module.exports = {handleLogin};
