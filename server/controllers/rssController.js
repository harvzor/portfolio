module.exports = function(app, fs, express, config, logger, data, helpers) {
    // Redirect old portfolio link to projects.
    app.get('/rss', function(req, res) {
        res.set('Content-Type', 'text/xml');

        res.render('rss', {
            layout: 'rss',
            helpers: helpers,
            posts: data().posts
        });
    });
};

