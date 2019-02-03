import app from '../app';
import logger from '../logger';
import data from '../data';
import helpers from '../helpers';

export default function(page) {
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
