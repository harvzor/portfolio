import bunyan = require('bunyan');

interface ILogger {
    info: Function,
    warn: Function,
    error: Function,
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
