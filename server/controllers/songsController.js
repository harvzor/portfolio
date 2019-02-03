const app = require('../app.js');
const logger = require('../logger.js');
const data = require('../data.js');
const helpers = require('../helpers.js');

module.exports = function(page) {
    app.get(page.path, (req, res) => {
        res.render('songs', {
            helpers: helpers,
            layout: '_common',
            relativeUrl: page.relativeUrl,
            metaDescription: page.metaDescription,
            pageGroup: '',
            pageTitle: page.pageTitle,
            songs: page.children,
            page: page
        });
    });
};
