const winston = require('winston');
const path = require('path');

/**
 error (0)
 warn (1)
 info (2)
 verbose (3)
 debug (4)
 silly (5)
 */


const transports = [
    new winston.transports.Console({level: 'info', format: winston.format.combine(winston.format.colorize())}),
    new winston.transports.File({
        filename: path.join(__dirname, '..', '..', 'logs', 'info.log'), level: 'info', format: winston.format.json()
    }),
    new winston.transports.File({
        filename: path.join(__dirname, '..', '..', 'logs', 'error.log'), level: 'error', format: winston.format.json()
    }),
]

const logger = winston.createLogger({
    format    : winston.format.combine(
        winston.format.timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
        winston.format.printf((info) => `${info.timestamp} [${info.level}] : ${info.message}`)),
    transports: transports
});

module.exports = logger
