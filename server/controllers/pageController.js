const logger = require('../logger');

module.exports = function(app, fs, express, config, data, helpers, page) {
    app.get(page.path, function(req, res) {
        res.render('page', {
            helpers: helpers,
            layout: '_common',
            relativeUrl: '',
            metaDescription: page.metaDescription,
            pageGroup: page.pageGroup,
            pageTitle: page.pageTitle,
            bodyText: page.bodyText
        });
    });
};
