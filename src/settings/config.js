const cors = require("cors");
const morgan = require("morgan");
const path = require("path");
const fs = require("fs");
const taskRouter = require("../tasks/task.router");
const authRouter = require("../auth/auth.router");
const userRouter = require("../users/users.router");
const responseFormatter = require("../middlewares/responseFormatter");
const expressWinstonLogger = require("../middlewares/expressWinston.middleware");


function configureApp(app) {
    app.use(cors()); // wild card
    app.use(responseFormatter);
    app.use(expressWinstonLogger);


    let accessLogStream = fs.createWriteStream(path.join(__dirname, '../../access.log'), {flags: 'a'})
    app.use(morgan('combined', {stream: accessLogStream}))

    app.use('/', taskRouter);
    app.use('/auth', authRouter);
    app.use('/users', userRouter);
}

module.exports = configureApp;
