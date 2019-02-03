"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("../app");
const data_1 = require("../data");
const helpers_1 = require("../helpers");
function default_1() {
    // Redirect old portfolio link to projects.
    app_1.default.get('/rss', function (req, res) {
        res.set('Content-Type', 'text/xml');
        res.render('rss', {
            layout: '_empty',
            helpers: helpers_1.default,
            posts: data_1.default().blog.children
        });
    });
}
exports.default = default_1;
;
//# sourceMappingURL=rssController.js.map