module.exports = function(app, fs, express, config, logger, data, helpers) {
    app.get('/blog', function(req, res) {
        logger.info('tag: %s', req.query.tag);

        var posts = data().posts;
        var tagsWithQuantity = helpers.getBlogTags(posts);

        if (req.query.tag) {
            posts = posts.filter(function(post) {
                return post.tags.indexOf(req.query.tag) > -1;
            });
        }

        // Order posts by date.
        posts = posts.sort(function(a, b) {
            return new Date(b.postDate).getTime() - new Date(a.postDate).getTime();
        });

        res.render('posts', {
            helpers: helpers,
            layout: 'common',
            relativeUrl: 'blog',
            metaDescription: 'Read about my latest thoughts and experiences in the world of web development.',
            pageGroup: 'blog',
            pageTitle: 'Blog', 
            postsByYear: helpers.orderBlogPostsByYear(posts),
            tags: tagsWithQuantity,
            currentTag: req.query.tag
        });
    });
};

