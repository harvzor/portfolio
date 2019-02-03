//declare function require(name:string);

import fs = require('fs');
import express = require('express');

import config from './config';
import data from './data';
import logger from './logger';
import app from './app';
import helpers from './helpers';

const routing = function() {
    //var firstRun = true;
    var cachedAmpCss;

    // Reloads the CSS if in dev mode.
    var ampCss = function() {
        if (cachedAmpCss == null || config.dev) {
            cachedAmpCss = fs.readFileSync('./public/css/amp.css', 'utf8');
        }

        return cachedAmpCss;
    }

    var setupController = async(page) => {
        try {
            let module = await import(`./controllers/${page.controller}Controller`);

            module.default(page);

            //const controller = require('./controllers/' + page.controller + 'Controller');

            //controller(page);
        } catch (e) {
            logger.error('Failed to render page with name: ' + page.name, e);
        }
    };

    var setupControllers = (obj) => {
        for (let key of Object.keys(obj)) {
            var page = obj[key];

            /*
                if (!helpers.isObject(page)) {
                    continue;
                }
            */

            if (typeof page.controller !== 'undefined') {
                setupController(page);
            }

            if (typeof page.children !== 'undefined' && page.children.length > 0) {
                setupControllers(page.children);
            }
        }
    };

    setupControllers(data());

    import(`./controllers/rssController`)
        .then(module => module.default());
    import(`./controllers/sitemapXmlController`)
        .then(module => module.default());

    //require('./controllers/rssController')();
    //require('./controllers/sitemapXmlController')();

    /////////////////
    // Static files
    /////////////////

    app.use(express.static('./public'));

    // Just used for verifying SSL with Let's Encrypt.
    app.use('/.well-known', express.static('./.well-known'));

    if (config.dev) {
        app.use(express.static('./src'));
    }

    /////////////////
    // Statuses
    /////////////////

    // These have to be setup after everything else.

    if (!config.dev) {
        app.use((req, res, next) => {
            logger.info('404 error: %s', req.originalUrl);

            res.status(404).render('page', {
                helpers: helpers,
                layout: '_common',
                relativeUrl: '404',
                pageGroup: '',
                pageTitle: 'Status: 404',
                bodyText: '<p>You\'re looking for a page that doesn\'t exist...</p><p>Man, what a boring page. I should probably make it a bit more interesting. I\'ll add that to the to-do list.</p>',
                page: {
                    controller: 'page'
                }
            });
        });

        app.use((err, req, res, next) => {
            logger.error('500 error: %s', err.stack);

            res.status(500).render('page', {
                helpers: helpers,
                layout: '_common',
                relativeUrl: '500',
                pageGroup: '',
                pageTitle: 'Status: 500',
                bodyText: '<p>Oh no. This page has an error... I\'m probably not even aware of this.</p><p>Do you mind getting in contact with me about it? I\'m on <a href="https://twitter.com/Harvzor" target="_blank">Twitter</a>.</p>',
                page: {
                    controller: 'page'
                }
            });
        });
    }
}();

export default routing;
