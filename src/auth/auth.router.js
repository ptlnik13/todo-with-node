const express = require('express');
const authRouter = express.Router();
const {handleLogin} = require('./auth.controller.js')
const authValidator = require("./validator/auth.validator");
const {validationResult} = require("express-validator");
const {StatusCodes} = require("http-status-codes");

authRouter.post('/login', authValidator, (req, res) => {
    const result = validationResult(req);
    if (result.isEmpty()) {
       return handleLogin(req, res)
    }else{
        res.send(StatusCodes.BAD_REQUEST).json(result.array())
    }
})


module.exports = authRouter;
