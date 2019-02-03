"use strict";
//declare function require(name:string);
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const express = require("express");
const config = require("./config.json");
const data_1 = require("./data");
const logger_1 = require("./logger");
const app_1 = require("./app");
const helpers_1 = require("./helpers");
const routing = function () {
    //var firstRun = true;
    var cachedAmpCss;
    // Reloads the CSS if in dev mode.
    var ampCss = function () {
        if (cachedAmpCss == null || config.dev) {
            cachedAmpCss = fs.readFileSync('./public/css/amp.css', 'utf8');
        }
        return cachedAmpCss;
    };
    var setupController = (page) => __awaiter(this, void 0, void 0, function* () {
        try {
            let module = yield Promise.resolve().then(() => require(`./controllers/${page.controller}Controller`));
            module.default(page);
            //const controller = require('./controllers/' + page.controller + 'Controller');
            //controller(page);
        }
        catch (e) {
            logger_1.default.error('Failed to render page with name: ' + page.name, e);
        }
    });
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
    setupControllers(data_1.default());
    Promise.resolve().then(() => require(`./controllers/rssController`)).then(module => module.default());
    Promise.resolve().then(() => require(`./controllers/sitemapXmlController`)).then(module => module.default());
    //require('./controllers/rssController')();
    //require('./controllers/sitemapXmlController')();
    /////////////////
    // Static files
    /////////////////
    app_1.default.use(express.static('./public'));
    // Just used for verifying SSL with Let's Encrypt.
    app_1.default.use('/.well-known', express.static('./.well-known'));
    if (config.dev) {
        app_1.default.use(express.static('./src'));
    }
    /////////////////
    // Statuses
    /////////////////
    // These have to be setup after everything else.
    if (!config.dev) {
        app_1.default.use((req, res, next) => {
            logger_1.default.info('404 error: %s', req.originalUrl);
            res.status(404).render('page', {
                helpers: helpers_1.default,
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
        app_1.default.use((err, req, res, next) => {
            logger_1.default.error('500 error: %s', err.stack);
            res.status(500).render('page', {
                helpers: helpers_1.default,
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
exports.default = routing;
//# sourceMappingURL=routing.js.map