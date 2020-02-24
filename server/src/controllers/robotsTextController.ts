import app from '../app';
import logger from '../logger';

export default function() {
    // Redirect old portfolio link to projects.
    app.get('/robots.txt', function(req, res) {
        res.set('Content-Type', 'text/plain');

        res.render('robotsText.ejs', {
            layout: '_empty', // This probably causes the template to be created twice...
        });
    });
};
