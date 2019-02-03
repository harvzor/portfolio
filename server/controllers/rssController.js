const app = require('../app.js');
const logger = require('../logger.js');
const data = require('../data.js');
const helpers = require('../helpers.js');

module.exports = function() {
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
