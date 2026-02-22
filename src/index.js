const express = require('express');
const fs = require('fs');
const path = require('path');
const morgan = require('morgan');
const taskRouter = require('./tasks/task.router.js');
const {statusCodes, StatusCodes} = require('http-status-codes');
const cors = require('cors');
const responseFormatter = require('./middlewares/responseFormatter.js');

const app = express();

app.use(express.json());

// const corsOptions = {
//     origin: ['example.com', 'http://localhost:3000']
// }
//
// app.use(cors(corsOptions));

app.use(cors()); // wild card
app.use(responseFormatter)

const port = 3001;

let accessLogStream = fs.createWriteStream(path.join(__dirname, '../access.log'), {flags: 'a'})
app.use(morgan('combined', {stream: accessLogStream}))

app.use('/', taskRouter);

app.use((req, res) => res.status(StatusCodes.NOT_FOUND).json(null))

app.listen(port, () => console.log(`The app listening on port http://localhost:${port}`));
