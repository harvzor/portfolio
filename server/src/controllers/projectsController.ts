import Page from '../interfaces/Page';
import Project from '../interfaces/Pages/Project';

import app from '../app';
import logger from '../logger';
import Data from '../data';
import helpers from '../helpers';

export default (page: Page) => {
    app.get(page.path, function(req, res) {
        let projects = Data.getPage('/projects').children as Array<Project>;

        projects = projects
            .sort((a,  b) => a.position - b.position);

        res.render('project-examples', {
            helpers: helpers,
            layout: '_common',
            //relativeUrl: page.relativeUrl,
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
