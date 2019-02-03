"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("../app");
const helpers_1 = require("../helpers");
function default_1(page) {
    app_1.default.get(page.path, (req, res) => {
        res.render('songs', {
            helpers: helpers_1.default,
            layout: '_common',
            relativeUrl: page.relativeUrl,
            metaDescription: page.metaDescription,
            pageGroup: '',
            pageTitle: page.pageTitle,
            songs: page.children,
            page: page
        });
    });
}
exports.default = default_1;
;
//# sourceMappingURL=songsController.js.map