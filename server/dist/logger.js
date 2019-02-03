"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bunyan = require("bunyan");
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
exports.default = logger;
//# sourceMappingURL=logger.js.map