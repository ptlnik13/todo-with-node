const {Schema, model} = require('mongoose');

const taskSchema = new Schema({
    title      : {
        type     : String,
        required : [true, 'Task title is required'],
        trim     : true,
        maxLength: [100, 'Task title cannot be longer than 100 characters']
    },
    description: {
        type     : String,
        trim     : true,
        required : [true, 'Task description is required'],
        maxLength: [500, 'Task description cannot be longer than 500 characters']
    },
    status     : {
        type    : String,
        required: [true, 'Task status is required'],
        enum    : ['todo', 'inProgress', 'completed'],
        default : 'todo'
    },
    priority   : {
        type    : String,
        required: [true, 'Task priority is required'],
        enum    : ['low', 'normal', 'high'],
        default : 'normal'
    },
    dueDate    : {
        type    : Date,
        required: [true, 'Task due date is required'],
    },
    user       : {
        type    : Schema.Types.ObjectId,
        ref     : 'User',
        required: true
    }
}, {timestamps: true, versionKey: false});

const Task = model('Task', taskSchema);

module.exports = Task;

/**
 * @swagger
 *
 * components:
 *   schemas:
 *     Task:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - status
 *         - priority
 *         - dueDate
 *       properties:
 *          title:
 *            type: string
 *            description: The Title of the Task
 *            maxLength: 100
 *          description:
 *            type: string
 *            description: The Description of the Task
 *            maxLength: 500
 *          status:
 *            type: string
 *            description: The Status of the Task
 *            enum: ["todo", "inProgress", "completed"]
 *          priority:
 *            type: string
 *            description: The Priority of the Task
 *            enum: ['low', 'normal', 'high']
 *          dueDate:
 *            type: string
 *            format: ISO8601 Date String
 *            description: The Due Date of the Task
 *       example:
 *          title: Create a new Video
 *          description: Create a new Video for the user
 *          status: todo
 *          priority: normal
 *          dueDate: 2023-07-01T00:00:00Z
 */
