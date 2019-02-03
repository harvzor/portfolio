const config = require('./server/config.json');

// Allows config to be used in .ejs files too.
global.dev = config.dev;

/////////////////
// Start website
/////////////////

require('./server/dist/app.js');
require('./server/dist/routing.js');

/////////////////
// Functions
/////////////////

Array.prototype.filterObjects = function(key, value) {
    return this.filter(function(x) { return x[key] === value; })
};
