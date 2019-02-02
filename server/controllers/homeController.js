const logger = require('../logger');

module.exports = function(app, fs, express, config, data, helpers, page) {
    app.get(page.path, (req, res) => {
        let dataObject = data();

        let posts = dataObject.blog.children
            // Order by date.
            .sort(function(a, b) {
                return new Date(b.postDate).getTime() - new Date(a.postDate).getTime();
            });

        let projects = data().projects.children
            .sort((a,  b) => a.position - b.position);

        // Page title is an array so pick a random one from the array.
        let pageTitle = page.pageTitle[helpers.getRandomInt(0, page.pageTitle.length - 1)];

        res.render('home', {
            helpers: helpers,
            layout: '_common',
            relativeUrl: '',
            metaDescription: page.metaDescription,
            pageGroup: 'home',
            pageTitle: pageTitle,
            bodyText: page.bodyText,
            technologies: page.technologies,
            posts: posts.slice(0, 3),
            projects: projects.slice(0, 3),
            page: page
        });
    });
};
