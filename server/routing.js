module.exports = function(app, fs, express, config, logger) {
    //var firstRun = true;
    var dataModule = require('../server/data.js');
    var helpers = require('../server/helpers.js');
    var actualData;
    var cachedAmpCss;

    // Reloads the data if in dev mode, better for writing new posts!
    var data = function() {
        if (actualData == null || config.dev) {
            actualData = dataModule(fs, logger);
        }

        return actualData;
    };

    // Reloads the CSS if in dev mode.
    var ampCss = function() {
        if (cachedAmpCss == null || config.dev) {
            cachedAmpCss = fs.readFileSync('./public/css/amp.css', 'utf8');
        }

        return cachedAmpCss;
    }

    var setupController = (page) => {
        try {
            require('../server/controllers/' + page.controller + 'Controller.js')(app, ampCss, express, config, logger, data, helpers, page);
        } catch (e) {
            logger.error('Failed to render page with name: ' + page.name, e);
        }
    };

    var setupControllers = (obj) => {
        for (let key of Object.keys(obj)) {
            var page = obj[key];

            if (!helpers.isObject(page)) {
                continue;
            }

            if (typeof page.controller !== 'undefined') {
                setupController(page);
            }

            if (typeof page.children !== 'undefined' && page.children.length > 0) {
                setupControllers(page.children);
            }
        }
    };

    setupControllers(data());

    require('../server/controllers/redirectsController.js')(app, ampCss, express, config, logger, data, helpers);
    require('../server/controllers/rssController.js')(app, ampCss, express, config, logger, data, helpers);

    // Load each controller and run them.
    /*
        fs.readdirSync('./server/controllers/').forEach(function(file) {
            require('../server/controllers/' + page.controller + 'Controller.js')(app, ampCss, express, config, logger, data, helpers);
        });
    */

    /////////////////
    // Static files
    /////////////////

    app.use(express.static('./public'));

    // Just used for verifying SSL with Let's Encrypt.
    app.use('/.well-known', express.static('./.well-known'));

    if (global.dev) {
        app.use(express.static('./src'));
    }

    /////////////////
    // Statuses
    /////////////////

    // These have to be setup after everything else.

    if (!global.dev) {
        app.use((req, res, next) => {
            logger.info('404 error: %s', req.originalUrl);

            res.status(404).render('page', {
                layout: '_common',
                relativeUrl: '404',
                pageGroup: '',
                pageTitle: 'Status: 404',
                bodyText: '<p>You\'re looking for a page that doesn\'t exist...</p>'
            });
        });

        app.use((err, req, res, next) => {
            logger.error('500 error: %s', err.stack);

            res.status(500).render('page', {
                layout: '_common',
                relativeUrl: '500',
                pageGroup: '',
                pageTitle: 'Status: 500',
                bodyText: '<p>So sorry, but a problem occured! Please email me if this problem persists.</p>'
            });
        });
    }
};
