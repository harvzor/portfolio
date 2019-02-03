const config = require('./server/config.json');

// Allows config to be used in .ejs files too.
global.dev = config.dev;

/////////////////
// Start website
/////////////////
const express = require('express');
const fs = require('fs');

const app = require('./server/app.js');

require('./server/routing.js');

/////////////////
// Functions
/////////////////

Array.prototype.filterObjects = function(key, value) {
    return this.filter(function(x) { return x[key] === value; })
};
