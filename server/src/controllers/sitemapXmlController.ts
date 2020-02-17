import app from '../app';
import logger from '../logger';
import Data from '../data';
import helpers from '../helpers';

export default function() {
    // Redirect old portfolio link to projects.
    app.get('/sitemap.xml', function(req, res) {
        res.set('Content-Type', 'text/xml');

        res.render('sitemapXml', {
            layout: '_empty', // This probably causes the template to be created twice...
            helpers: helpers,
            host: req.socket.parser.incoming.headers.host,
            data: Data.data
        });
    });
};
