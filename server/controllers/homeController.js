module.exports = function(app, fs, express, config, logger, data, helpers) {
    app.get('/', function(req, res) {
        let posts = data().posts
            // Order by date.
            .sort(function(a, b) {
                return new Date(b.postDate).getTime() - new Date(a.postDate).getTime();
            });

        let index = data().index;

        // Page title is an array so pick a random one from the array.
        let pageTitle = index.pageTitle[helpers.getRandomInt(0, index.pageTitle.length - 1)];

        res.render('home', {
            helpers: helpers,
            layout: '_common',
            relativeUrl: '',
            metaDescription: index.metaDescription,
            pageGroup: 'home',
            pageTitle: pageTitle,
            bodyText: index.bodyText,
            posts: posts.slice(0, posts.length > 3 ? 3 : posts.length)
        });
    });
};
