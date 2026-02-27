const express = require('express');
const authRouter = express.Router();
const {handleLogin} = require('./auth.controller.js')
const authValidator = require("./validator/auth.validator");
const {validationResult} = require("express-validator");
const {StatusCodes} = require("http-status-codes");


/**
 * @swagger
 *
 * /auth/login:
 *  post:
 *    summary: User login
 *    tags: [Authentication]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Login'
 *    responses:
 *      200:
 *        description: User Login successful
 *        content:
 *          application/json:
 *            example:
 *              status: success
 *              statusCode: 200
 *              message: Ok
 *              data:
 *                accessToken: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NzQ4NWFjYTMzMzY1MDAzZGRlYTcwODEiLCJlbWFpbCI6ImpvaG5AZG9lLmNvbSIsImlhdCI6MTczMzEyODI1MCwiZXhwIjoxNzMzMjE0NjUwfQ.xv9Qypl4Etgk5t8MxBHfF7_3f9871RtlWQm_pxqsl1g
 */
authRouter.post('/login', authValidator, (req, res) => {
    const result = validationResult(req);
    if (result.isEmpty()) {
       return handleLogin(req, res)
    }else{
        res.send(StatusCodes.BAD_REQUEST).json(result.array())
    }
})


module.exports = authRouter;


/**
 * @swagger
 *
 * components:
 *  schemas:
 *   Login:
 *    type: object
 *    required:
 *      - email
 *      - password
 *    properties:
 *      email:
 *        type: string
 *        description: A valid email address
 *      password:
 *        type: string
 *        description: Must contain 8 characters and also a number, a capital letter and a special character
 *    example:
 *      email: john@doe.com
 *      password: Password123#
 *  */
