module.exports = function(app, fs, express, config, logger, data, helpers) {
    // Render project pages
    for(var i = 0; i < data().exampleGroups.length; i++) {
        (function(i) {
            for(var x = 0; x < data().exampleGroups[i].pages.length; x++) {
                (function(x) {
                    app.get('/projects/' + data().exampleGroups[i].pages[x].href, function(req, res) {
                        var example = data().exampleGroups[i].pages[x];

                        (function(example) {
                            res.render('project-example', {
                                layout: 'common',
                                relativeUrl: example.href,
                                metaDescription: example.metaDescription,
                                pageGroup: 'projects',
                                parentPages: [
                                    {
                                        title: 'projects',
                                        href: '/projects'
                                    }
                                ],
                                pageTitle: example.name,
                                cover: example.cover,
                                bodyText: example.bodyText
                            });
                        })(example);
                    });
                })(x);
            }
        })(i);
    }
};

