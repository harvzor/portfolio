"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("../app");
function default_1(page) {
    page.redirects.forEach(redirect => {
        app_1.default.get(redirect.from, (req, res) => {
            res.redirect(redirect.to);
        });
    });
}
exports.default = default_1;
;
//# sourceMappingURL=redirectsController.js.map