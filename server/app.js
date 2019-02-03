const express = require('express');
const compression = require('compression');
const expressLayouts = require('express-ejs-layouts');

const config = require('./config.json');
const data = require('./data.js');
const logger = require('./logger.js');

const app = express();

app.use(compression());

app.locals.songOfTheMoment = function() {
    return data().songs.children[0];
};

/////////////////
// Templating
/////////////////

app.set('view engine', 'ejs');

app.use(expressLayouts)

/////////////////
// Inititialise
/////////////////

if (config.type === 'node') {
    // Used for Node server.
    var server = app.listen(config.port, config.ip, function () {
        var host = server.address().address;
        var port = server.address().port;

        logger.info('Website listening at http://%s:%s.', host, port);
    });
} else if (config.type == 'iis') {
    // Used for IISNode.
    app.listen(process.env.PORT);
} else {
    logger.error('Error: wrong config.type set');
}

/////////////////
// Export
/////////////////

module.exports = app;
