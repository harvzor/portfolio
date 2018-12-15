const logger = require('../logger');

module.exports = function(app, fs, express, config, data, helpers) {
    // Redirect old portfolio link to projects.
    app.get('/rss', function(req, res) {
        res.set('Content-Type', 'text/xml');

        res.render('rss', {
            layout: '_empty', // This probably causes the template to be created twice...
            helpers: helpers,
            posts: data().blog.children
        });
    });
};
