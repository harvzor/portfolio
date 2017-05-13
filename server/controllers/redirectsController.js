module.exports = function(app, fs, express, config, logger, data, helpers) {
    // Redirect old portfolio link to projects.
    app.get('/portfolio', function(req, res) {
        res.redirect('/projects');
    });
};

