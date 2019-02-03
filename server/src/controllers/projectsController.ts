import app from '../app';
import logger from '../logger';
import data from '../data';
import helpers from '../helpers';

export default (page) => {
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
