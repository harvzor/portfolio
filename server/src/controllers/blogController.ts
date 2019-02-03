import app from '../app';
import logger from '../logger';
import data from '../data';
import helpers from '../helpers';

/*
    var getPrevAndNextPosts = (data, post) => {
        var prev = null;
        var next = null;

        var index = data().blog.children
            .map((x) => { return x.href; })
            .indexOf(post.href);

        // If not the first ever post.
        if (index < data().blog.children.length - 1) {
            prev = data().blog.children[index + 1];
        }

        // If not the latest post.
        if (index != 0) {
            next = data().blog.children[index - 1];
        }

        return {
            prev: prev,
            next: next
        };
    };
*/

export default function(page) {
    // Render blog post.
    app.get(page.path, (req, res) => {
        let post = null;

        let url = req.originalUrl
            .split('/')[2]
            .split('?')[0];

        asd

        let otherPosts = data().blog.children
            .filter(otherPost => {
                if (otherPost.href === url) {
                    post = otherPost;

                    return false;
                }

                return true;
            });

        //let relatedPosts = getPrevAndNextPosts(data, post);

        let relatedPostsWithMatchingTagsCount = otherPosts
            .map(otherPost => {
                let numberOfMatchingTags = 0;

                otherPost.tags.forEach(otherPostTag => {
                    if (post.tags.includes(otherPostTag)) {
                        numberOfMatchingTags++;
                    }
                });

                return {
                    matching: numberOfMatchingTags,
                    post: otherPost
                };
            })
            .filter(otherPost => otherPost.matching > 0)
            .sort((otherPostA, otherPostB) => otherPostA.matching < otherPostB.matching)
            .slice(0, 3);

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
            tags: post.tags,
            relatedPosts: relatedPostsWithMatchingTagsCount,
            //prevPost: relatedPosts.prev,
            //nextPost: relatedPosts.next,
            canonical: post.canonical,
            page: post
            //ampCanonical: '/amp/blog/' + url
        });
    });

    /*
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
    */
};
