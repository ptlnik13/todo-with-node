const express = require('express');
const {handleCreateUser} = require("./users.controller");
const createUserValidator = require("./validators/createUser.validator");
const {StatusCodes} = require("http-status-codes");
const {validationResult} = require("express-validator");

const userRouter = express.Router();


userRouter.post('/create', createUserValidator, (req, res) => {
    const task = validationResult(req)
    if (task.isEmpty()) {
        return handleCreateUser(req, res)
    } else {
        res.send(StatusCodes.BAD_REQUEST).json(task.array())
    }
})

module.exports = userRouter;
