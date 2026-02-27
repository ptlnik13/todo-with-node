const express = require('express');
const {validationResult} = require('express-validator');
const taskRouter = express.Router();
const {handleGetTask, handlePostTask, handlePatchTask, handleDeleteTask} = require("./tasks.controller");
const {StatusCodes} = require("http-status-codes");
const createTaskValidator = require("./validators/createTask.validator");
const getTasksValidator = require("./validators/getTasks.validator");
const updateTaskValidator = require("./validators/updateTask.validator");
const deleteTaskValidator = require("./validators/deleteTask.validator");
const authenticateToken = require("../middlewares/authenticateToken.middleware");

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 * /tasks:
 *   get:
 *     summary: Get all tasks
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: The number of tasks needed in a single response.
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: The page number of the tasks response.
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           default: 'asc'
 *           enum: [asc, desc]
 *         description: Order of tasks ('asc' or 'desc').
 *     responses:
 *       200:
 *         description: A list of tasks
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Task'
 *       401:
 *         description: Not Authorized error
 *         content:
 *           application/json:
 *             example:
 *               error:
 *                 message: "You are not Authorized to perform this request"
 *       403:
 *         description: Forbidden
 *         content:
 *           application/json:
 *             example:
 *               error:
 *                 message: "Your token is either expired or invalid."
 */
taskRouter.get('/tasks', [getTasksValidator, authenticateToken], (req, res) => {
    const result = validationResult(req);
    if (result.isEmpty()) {
        return handleGetTask(req, res)
    } else {
        return res.status(StatusCodes.BAD_REQUEST).json(result.array())
    }
})

/**
 * @swagger
 *
 * components:
 *  securitySchemes:
 *      bearerAuth:
 *          type: http
 *          scheme: bearer
 *          bearerFormat: JWT
 * /tasks:
 *  post:
 *      summary: Create a new task
 *      tags: [Tasks]
 *      security:
 *      - bearerAuth: []
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Task'
 *      responses:
 *          '201':
 *              description: Task created successfully
 *              content:
 *                  application/json:
 *                      example:
 *                          statusCode: 201
 *                          status: success
 *                          message: Task created successfully
 *                          data:
 *                              _id: 64b5c0f0e4b9b9b9b9b9b9b9
 *                              title: Create a new Video
 *                              description: Create a new Video for the user
 *                              status: todo
 *                              priority: normal
 *                              dueDate: 2023-07-01T00:00:00.000Z
 *
 *          '401':
 *              description: Unauthorized
 *              content:
 *                  application/json:
 *                      example:
 *                          statusCode: 401
 *                          status: error
 *                          message: Unauthorized
 *                          error:
 *                              message: Access denied
 *
 *          '403':
 *              description: Forbidden
 *              content:
 *                  application/json:
 *                      example:
 *                          statusCode: 403
 *                          status: error
 *                          message: Forbidden
 *                          error:
 *                              message: Invalid token, Please login again
 */
taskRouter.post('/tasks', [createTaskValidator, authenticateToken], (req, res) => {
    const result = validationResult(req);
    if (result.isEmpty()) {
        return handlePostTask(req, res)
    } else {
        return res.status(StatusCodes.BAD_REQUEST).json(result.array())
    }
})

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 * /tasks:
 *   patch:
 *     summary: Update a task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TaskUpdate'
 *     responses:
 *       200:
 *         description: Shape of task response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TaskUpdate'
 *       401:
 *         description: Not Authorized error
 *         content:
 *           application/json:
 *             example:
 *               error:
 *                 message: "You are not Authorized to perform this request"
 *       403:
 *         description: Forbidden
 *         content:
 *           application/json:
 *             example:
 *               error:
 *                 message: "Your token is either expired or invalid."
 */
taskRouter.patch('/tasks', [updateTaskValidator, authenticateToken], (req, res) => {
    const result = validationResult(req);
    if (result.isEmpty()) {
        return handlePatchTask(req, res)
    } else {
        return res.status(StatusCodes.BAD_REQUEST).json(result.array())
    }
})

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 * /tasks:
 *   delete:
 *     summary: Delete a task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TaskDelete'
 *     responses:
 *       200:
 *         description: Shape of task response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TaskDelete'
 *       401:
 *         description: Not Authorized error
 *         content:
 *           application/json:
 *             example:
 *               error:
 *                 message: "You are not Authorized to perform this request"
 *       403:
 *         description: Forbidden
 *         content:
 *           application/json:
 *             example:
 *               error:
 *                 message: "Your token is either expired or invalid."
 */
taskRouter.delete('/tasks', [deleteTaskValidator, authenticateToken], (req, res) => {
    const result = validationResult(req);
    if (result.isEmpty()) {
        return handleDeleteTask(req, res)
    } else {
        return res.status(StatusCodes.BAD_REQUEST).json(result.array())
    }
})


module.exports = taskRouter;
