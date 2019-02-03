"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("../app");
const helpers_1 = require("../helpers");
function default_1(page) {
    app_1.default.get(page.path, function (req, res) {
        res.render('page', {
            helpers: helpers_1.default,
            layout: '_common',
            relativeUrl: '',
            metaDescription: page.metaDescription,
            pageGroup: page.pageGroup,
            pageTitle: page.pageTitle,
            bodyText: page.bodyText,
            page: page
        });
    });
}
exports.default = default_1;
;
//# sourceMappingURL=pageController.js.map