"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const compression = require("compression");
const expressLayouts = require("express-ejs-layouts");
const config = require("./config.json");
const data_1 = require("./data");
const logger_1 = require("./logger");
const app = express();
app.use(compression());
app.locals.songOfTheMoment = function () {
    return data_1.default().songs.children[0];
};
/////////////////
// Templating
/////////////////
app.set('view engine', 'ejs');
app.use(expressLayouts);
/////////////////
// Inititialise
/////////////////
if (config.type === 'node') {
    // Used for Node server.
    var server = app.listen(config.port, config.ip, function () {
        var host = server.address().address;
        var port = server.address().port;
        logger_1.default.info('Website listening at http://%s:%s.', host, port);
    });
}
else if (config.type == 'iis') {
    // Used for IISNode.
    app.listen(process.env.PORT);
}
else {
    logger_1.default.error('Error: wrong config.type set');
}
/////////////////
// Export
/////////////////
exports.default = app;
//# sourceMappingURL=app.js.map