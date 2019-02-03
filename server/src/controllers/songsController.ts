import app from '../app';
import logger from '../logger';
import data from '../data';
import helpers from '../helpers';

export default function(page) {
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
