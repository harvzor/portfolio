const app = require('../app.js');
const logger = require('../logger.js');
const data = require('../data.js');
const helpers = require('../helpers.js');

module.exports = function(page) {
    page.redirects.forEach(redirect => {
        app.get(redirect.from, (req, res) => {
            res.redirect(redirect.to);
        });
    });
};
