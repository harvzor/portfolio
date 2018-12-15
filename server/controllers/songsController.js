const logger = require('../logger');

module.exports = function(app, fs, express, config, data, helpers, page) {
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
