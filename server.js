const config = require('./config.json');

// Allows config to be used in .ejs files too.
global.dev = config.dev;

/////////////////
// Start website
/////////////////

require('./server/dist/app.js');
require('./server/dist/routing.js');
