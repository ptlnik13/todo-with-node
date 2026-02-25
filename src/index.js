require('dotenv').config();
const express = require('express');
const {StatusCodes} = require('http-status-codes');
const mongoose = require('mongoose');
const configureApp = require('./settings/config');


const app = express();

app.use(express.json());

// const corsOptions = {
//     origin: ['example.com', 'http://localhost:3000']
// }
//
// app.use(cors(corsOptions));

configureApp(app)
app.use((req, res) => res.status(StatusCodes.NOT_FOUND).json(null))

const port = 3001;

async function bootstrap() {
    try {
        await mongoose.connect(process.env.MONGODB_CONNECTION, {dbName: 'fullstackTasks'})
        console.log('Connected to MongoDB')
        app.listen(port, () => console.log(`The app listening on port http://localhost:${port}`));
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
}

bootstrap();
