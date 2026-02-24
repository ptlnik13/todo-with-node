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
        minlength: [8, 'Password must be at least 8 characters long'],
        validate : {
            validator: function (password) {
                return /^(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password)
            },
            message  : props => `${props.value} is not a valid password!`
        }
    }
})

const User = model('User', userSchema);

module.exports = User;
