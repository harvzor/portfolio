const logger = require('../logger');

module.exports = function(app, fs, express, config, data, helpers) {
    // Redirect old portfolio link to projects.
    app.get('/portfolio', (req, res) => {
        res.redirect('/projects');
    });
};
