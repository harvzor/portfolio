"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("../app");
const data_1 = require("../data");
const helpers_1 = require("../helpers");
function default_1() {
    // Redirect old portfolio link to projects.
    app_1.default.get('/sitemap.xml', function (req, res) {
        res.set('Content-Type', 'text/xml');
        res.render('sitemapXml', {
            layout: '_empty',
            helpers: helpers_1.default,
            host: req.socket.parser.incoming.headers.host,
            data: data_1.default()
        });
    });
}
exports.default = default_1;
;
//# sourceMappingURL=sitemapXmlController.js.map