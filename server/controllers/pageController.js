const app = require('../app.js');
const logger = require('../logger.js');
const data = require('../data.js');
const helpers = require('../helpers.js');

module.exports = function(page) {
    app.get(page.path, function(req, res) {
        res.render('page', {
            helpers: helpers,
            layout: '_common',
            relativeUrl: '',
            metaDescription: page.metaDescription,
            pageGroup: page.pageGroup,
            pageTitle: page.pageTitle,
            bodyText: page.bodyText,
            page: page
        });
    });
};
