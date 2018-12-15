const logger = require('../logger');

module.exports = function(app, fs, express, config, data, helpers, page) {
    app.get(page.path, (req, res) => {
        var tag = req.query.tag;

        var posts = data().blog.children;
        var tagsWithQuantity = helpers.getBlogTags(posts);

        if (tag) {
            posts = posts.filter(function(post) {
                return post.tags.indexOf(tag) > -1;
            });
        }

        // Order posts by date.
        posts = posts.sort((a, b) => {
            return new Date(b.postDate).getTime() - new Date(a.postDate).getTime();
        });

        res.render('posts', {
            helpers: helpers,
            layout: '_common',
            relativeUrl: 'blog',
            metaDescription: page.metaDescription,
            pageGroup: page.pageGroup,
            pageTitle: page.pageTitle,
            postsByYear: helpers.orderBlogPostsByYear(posts),
            tags: tagsWithQuantity,
            currentTag: typeof tag === 'undefined' ? '' : tag,
            page: page
        });
    });
};
