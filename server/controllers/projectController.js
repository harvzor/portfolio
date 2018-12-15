const logger = require('../logger');

module.exports = function(app, fs, express, config, data, helpers, page) {
    // Render project pages
    app.get(page.path, (req, res) => {
        if (global.dev) {
            page = data.getPage(page.path);
        }

        res.render('project-example', {
            helpers: helpers,
            layout: '_common',
            relativeUrl: page.href,
            metaDescription: page.metaDescription,
            pageGroup: 'projects',
            parentPages: [
                {
                    title: 'projects',
                    href: '/projects'
                }
            ],
            pageTitle: page.name,
            cover: page.cover,
            bodyText: page.bodyText
        });
    });
};
