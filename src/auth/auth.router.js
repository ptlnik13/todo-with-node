const express = require('express');
const authRouter = express.Router();
const {handleLogin} = require('./auth.controller.js')

authRouter.post('/login', handleLogin)


module.exports = authRouter;
