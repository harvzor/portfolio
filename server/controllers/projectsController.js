module.exports = (app, fs, express, config, logger, data, helpers, page) => {
    app.get(page.path, function(req, res) {
        res.render('project-examples', {
            layout: '_common',
            relativeUrl: page.relativeUrl,
            metaDescription: page.metaDescription,
            pageGroup: page.pageGroup,
            pageTitle: page.pageTitle,
            projects: page.children
                .filter(project => project.published)
        });
    });
};
