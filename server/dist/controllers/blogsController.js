"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("../app");
const data_1 = require("../data");
const helpers_1 = require("../helpers");
var orderBlogPostsByYear = (posts) => {
    var postsByYear = [];
    var group = null;
    var post = null;
    var years = [];
    for (var i = 0; i < posts.length; i++) {
        post = posts[i];
        years.push(new Date(post.postDate).getFullYear());
    }
    years = years.filter(helpers_1.default.onlyUnique);
    for (var i = 0; i < years.length; i++) {
        group = {
            year: years[i],
            posts: []
        };
        for (var x = 0; x < posts.length; x++) {
            post = posts[x];
            if (new Date(post.postDate).getFullYear() == years[i]) {
                group.posts.push(post);
            }
        }
        postsByYear.push(group);
    }
    return postsByYear;
};
function default_1(page) {
    app_1.default.get(page.path, (req, res) => {
        const tag = req.query.tag;
        let posts = data_1.default().blog.children;
        const tagsWithQuantity = helpers_1.default.getBlogTags(posts);
        if (tag) {
            posts = posts.filter(post => {
                return post.tags.includes(tag);
            });
        }
        // Order posts by date.
        posts = posts.sort((a, b) => {
            return new Date(b.postDate).getTime() - new Date(a.postDate).getTime();
        });
        res.render('posts', {
            helpers: helpers_1.default,
            layout: '_common',
            relativeUrl: 'blog',
            metaDescription: page.metaDescription,
            pageGroup: page.pageGroup,
            pageTitle: page.pageTitle,
            postsByYear: orderBlogPostsByYear(posts),
            tags: tagsWithQuantity,
            currentTag: typeof tag === 'undefined' ? '' : tag,
            page: page
        });
    });
}
exports.default = default_1;
;
//# sourceMappingURL=blogsController.js.map