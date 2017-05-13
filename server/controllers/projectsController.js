module.exports = function(app, fs, express, config, logger, data, helpers) {
    // Render project parent
    app.get('/projects', function(req, res) {
        res.render('project-examples', {
            layout: 'common',
            relativeUrl: 'projects',
            metaDescription: 'Look through my projects that I have worked on.',
            pageGroup: 'projects',
            pageTitle: 'Projects',
            exampleGroups: data().exampleGroups
        });
    });
};

