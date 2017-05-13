module.exports = function(app, fs, express, config, logger, data, helpers) {
    app.get('/', function(req, res) {
        var posts = data().posts;

        // Order posts by date.
        posts = posts.sort(function(a, b) {
            return new Date(b.postDate).getTime() - new Date(a.postDate).getTime();
        });

        res.render('home', {
            helpers: helpers,
            layout: 'common',
            relativeUrl: '',
            metaDescription: 'Hi. I am a young experienced web developer living in Oxford. I specialise in Umbraco CMS development.',
            pageGroup: 'home',
            pageTitle: 'Hello World',
            bodyText: data().index.bodyText,
            posts: posts.slice(0, posts.length > 3 ? 3 : posts.length)
        });
    });
};

