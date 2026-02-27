const {Schema, model} = require('mongoose');

const userSchema = new Schema({
    firstName: {
        type     : String,
        required : [true, 'First name is required'],
        trim     : true,
        maxLength: [50, 'First name cannot be longer than 50 characters']
    },
    lastName : {
        type     : String,
        required : false,
        trim     : true,
        maxLength: [50, 'Last name cannot be longer than 50 characters']
    },
    email    : {
        type     : String,
        required : [true, 'Email is required'],
        unique   : true,
        trim     : true,
        lowercase: true,
        validate : {
            validator: function (email) {
                return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)
            },
            message  : props => `${props.value} is not a valid email address!`
        }
    },
    password : {
        type     : String,
        required : [true, 'Password is required'],
    }
}, {timestamps: true, versionKey: false})

const User = model('User', userSchema);

module.exports = User;

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - firstName
 *         - email
 *         - password
 *       properties:
 *         firstName:
 *           type: string
 *           description: The first name of the user
 *           maxLength: 100
 *         lastName:
 *           type: string
 *           description: The last name of the user
 *           maxLength: 500
 *         email:
 *           type: string
 *           description: A valid email address
 *         password:
 *           type: string
 *           description: Must be atleast 8 chars and contain a number, Capital letter and a special character
 *       example:
 *         firstName: John
 *         lastName: Doe
 *         email: john@doe.com
 *         password: Password123#
 */
