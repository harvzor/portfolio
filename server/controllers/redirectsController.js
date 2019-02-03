const app = require('../app.js');
const logger = require('../logger.js');
const data = require('../data.js');
const helpers = require('../helpers.js');

module.exports = function() {
    // Redirect old portfolio link to projects.
    app.get('/portfolio', (req, res) => {
        res.redirect('/projects');
    });

    app.get('/blog/favourite-youtube-channels', (req, res) => {
        res.redirect('/blog/35-youtube-channels-i-love')
    });
};
