const app = require('../app.js');
const logger = require('../logger.js');
const data = require('../data.js');
const helpers = require('../helpers.js');

module.exports = (page) => {
    app.get(page.path, function(req, res) {
        let projects = data().projects.children
            .sort((a,  b) => a.position - b.position);

        res.render('project-examples', {
            helpers: helpers,
            layout: '_common',
            relativeUrl: page.relativeUrl,
            metaDescription: page.metaDescription,
            pageGroup: page.pageGroup,
            pageTitle: page.pageTitle,
            bodyText: page.bodyText,
            projects: projects
                .filter(project => project.published),
            page: page
        });
    });
};
