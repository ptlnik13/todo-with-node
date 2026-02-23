const express = require('express');
const {handleCreateUser} = require("./users.controller");

const userRouter = express.Router();


userRouter.post('/create', handleCreateUser)

module.exports = userRouter;
