import bunyan = require('bunyan');
import fs = require('fs');

interface ILogger {
    info: Function,
    warn: Function,
    error: Function,
}

if (!fs.existsSync('logs')) {
    fs.mkdirSync('logs');
}

const logger = bunyan.createLogger({
    name: 'portfolio',
    streams: [
        {
            level: 'info',
            path: 'logs/log.txt'
        },
        {
            level: 'warn',
            path: 'logs/log.txt'
        },
        {
            level: 'error',
            path: 'logs/log.txt'
        }
    ]
});

export default logger;
