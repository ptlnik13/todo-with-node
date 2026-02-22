const express = require('express');
const taskRouter = require('./tasks/task.router.js');

const app = express();

app.use(express.json());

const port = 3001;

app.use('/', taskRouter);

app.listen(port, () => console.log(`The app listening on port http://localhost:${port}`));
