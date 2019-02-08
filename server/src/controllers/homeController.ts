import Post from '../interfaces/Pages/Post';
import Project from '../interfaces/Pages/Project';

import app from '../app';
import logger from '../logger';
import Data from '../data';
import helpers from '../helpers';

export default function(page) {
    app.get(page.path, (req, res) => {
        let blogPosts = Data.getPage('/blog').children as Array<Post>;

        blogPosts = blogPosts
            // Order by date.
            .sort(function(a, b) {
                return new Date(b.postDate).getTime() - new Date(a.postDate).getTime();
            });

        let projects = Data.getPage('/projects').children as Array<Project>;

        projects = projects
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
            posts: blogPosts.slice(0, 3),
            projects: projects.slice(0, 3),
            page: page
        });
    });
};
