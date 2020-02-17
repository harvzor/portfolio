import app from '../app';
import logger from '../logger';
import Data from '../data';
import helpers from '../helpers';

export default function(page) {
    page.redirects.forEach(redirect => {
        app.get(redirect.from, (req, res) => {
            res.redirect(redirect.to);
        });
    });
};
