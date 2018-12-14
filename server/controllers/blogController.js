module.exports = function(app, ampCss, express, config, logger, data, helpers) {
    // Render blog posts.
    for (var i = 0; i < data().posts.length; i++) {
        app.get('/blog/' + data().posts[i].href, function(req, res) {
            var prevPost = null;
            var nextPost = null;
            var url = req.originalUrl.split('/')[2]
                .split('?')[0];

            var post = data().posts.filterObjects('href', url)[0];

            var index = data().posts.map(function(x) { return x.href; }).indexOf(post.href);

            // If not the first ever post.
            if (index < data().posts.length - 1) {
                prevPost = data().posts[index + 1];
            }

            // If not the latest post.
            if (index != 0) {
                nextPost = data().posts[index - 1];
            }

            res.render('post', {
                helpers: helpers,
                layout: '_common',
                relativeUrl: url,
                metaDescription: post.metaDescription,
                pageGroup: 'blog',
                parentPages: [
                    {
                        title: 'blog',
                        href: '/blog'
                    }
                ],
                pageTitle: post.title,
                postDate: post.postDate,
                bodyText: post.bodyText,
                prevPost: prevPost,
                nextPost: nextPost,
                canonical: post.canonical,
                ampCanonical: '/amp/blog/' + url
            });
        });

        app.get('/amp/blog/' + data().posts[i].href, function(req, res) {
            var url = req.originalUrl.split('/')[3]
                .split('?')[0];

            var post = data().posts.filterObjects('href', url)[0];

            res.render('postAmp', {
                helpers: helpers,
                layout: '_amp',
                relativeUrl: url,
                metaDescription: post.metaDescription,
                pageGroup: 'blog',
                parentPages: [
                    {
                        title: 'blog',
                        href: '/blog'
                    }
                ],
                pageTitle: post.title,
                datePublished: post.postDate,
                canonical: typeof post.canonical === 'undefined' ? '/blog/' + url : post.canonical,
                ampBodyText: post.ampBodyText,
                ampCss: ampCss()
            });
        });
    }
};

