const logger = require('../logger');

module.exports = (app, fs, express, config, data, helpers, page) => {
    app.get(page.path, function(req, res) {
        let projects = data().projects.children;

        res.render('project-examples', {
            helpers: helpers,
            layout: '_common',
            relativeUrl: page.relativeUrl,
            metaDescription: page.metaDescription,
            pageGroup: page.pageGroup,
            pageTitle: page.pageTitle,
            projects: projects
                .filter(project => project.published),
            page: page
        });
    });
};
