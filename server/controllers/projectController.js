module.exports = function(app, fs, express, config, logger, data, helpers, page) {
    // Render project pages
    app.get(page.path, (req, res) => {
        res.render('project-example', {
            layout: '_common',
            relativeUrl: page.href,
            metaDescription: page.metaDescription,
            pageGroup: 'projects',
            parentPages: [
                {
                    title: 'projects',
                    href: '/projects'
                }
            ],
            pageTitle: page.name,
            cover: page.cover,
            bodyText: page.bodyText
        });
    });
};
