import Page from '../interfaces/Page';

import app from '../app';
import logger from '../logger';
import Data from '../data';
import helpers from '../helpers';

export default function(page: Page) {
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
