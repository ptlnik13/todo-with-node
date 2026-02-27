const express = require('express');
const {handleCreateUser} = require("./users.controller");
const createUserValidator = require("./validators/createUser.validator");
const {StatusCodes} = require("http-status-codes");
const {validationResult} = require("express-validator");

const userRouter = express.Router();

/**
 * @swagger
 * /user/create:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: Shape of task response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
userRouter.post('/create', createUserValidator, (req, res) => {
    const task = validationResult(req)
    if (task.isEmpty()) {
        return handleCreateUser(req, res)
    } else {
        res.send(StatusCodes.BAD_REQUEST).json(task.array())
    }
})

module.exports = userRouter;
