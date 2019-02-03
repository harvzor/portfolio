"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("../app");
const data_1 = require("../data");
const helpers_1 = require("../helpers");
exports.default = (page) => {
    app_1.default.get(page.path, function (req, res) {
        let projects = data_1.default().projects.children
            .sort((a, b) => a.position - b.position);
        res.render('project-examples', {
            helpers: helpers_1.default,
            layout: '_common',
            relativeUrl: page.relativeUrl,
            metaDescription: page.metaDescription,
            pageGroup: page.pageGroup,
            pageTitle: page.pageTitle,
            bodyText: page.bodyText,
            projects: projects
                .filter(project => project.published),
            page: page
        });
    });
};
//# sourceMappingURL=projectsController.js.map