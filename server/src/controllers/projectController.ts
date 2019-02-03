import app from '../app';
import logger from '../logger';
import data from '../data';
import helpers from '../helpers';
import config from '../config'

export default function(page) {
    // Render project pages
    app.get(page.path, (req, res) => {
        if (config.dev) {
            //page = data.getPage(page.path);
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
            bodyText: page.bodyText,
            page: page
        });
    });
};
