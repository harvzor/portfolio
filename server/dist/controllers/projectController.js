"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("../app");
const helpers_1 = require("../helpers");
const config = require("../config.json");
function default_1(page) {
    // Render project pages
    app_1.default.get(page.path, (req, res) => {
        if (config.dev) {
            //page = data.getPage(page.path);
        }
        res.render('project-example', {
            helpers: helpers_1.default,
            layout: '_common',
            relativeUrl: page.href,
            metaDescription: page.metaDescription,
            pageGroup: 'projects',
            parentPages: [
                {
                    title: 'projects',
                    href: '/projects'
                }
            ],
            pageTitle: page.name,
            cover: page.cover,
            bodyText: page.bodyText,
            page: page
        });
    });
}
exports.default = default_1;
;
//# sourceMappingURL=projectController.js.map