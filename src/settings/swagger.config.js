const swaggerJsdoc = require('swagger-jsdoc');
const path = require('path');

const options = {
    definition: {
        openapi: '3.1.0',
        info   : {
            title      : 'API Documentation',
            version    : '1.0.0',
            description: 'API Documentation for the application',
        },
        servers: [{url: 'http://localhost:3001'}],
    },
    apis      : [path.join(__dirname, '..', '**/*.js')],
}

const specs = swaggerJsdoc(options);
module.exports = specs;
