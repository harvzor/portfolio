module.exports = function(app, fs, express, config, logger, data, helpers) {
    app.get('/about', function(req, res) {
        res.render('page', {
            layout: '_common',
            relativeUrl: '',
            metaDescription: 'Hi. I am a young experienced web developer living in Oxford. I specialise in Umbraco CMS development.',
            pageGroup: 'about',
            pageTitle: 'About me',
            bodyText: data().about.bodyText
        });
    });

    app.get('/cv', function(req, res) {
        res.render('page', {
            layout: '_common',
            relativeUrl: '/cv',
            metaDescription: 'Looking to hire a great developer? We might be a perfect match.',
            pageGroup: '',
            pageTitle: 'Looking for some new talent?',
            bodyText: data().cv.bodyText
        });
    });

    /*
    app.get('/8tracks', function(req, res) {
        res.render('page', {
            layout: '_common',
            pageGroup: '',
            pageTitle: '8Tracks',
            bodyText: fs.readFileSync('data/8tracks.html', 'utf8')
        });
    });
    */

    app.get('/songs', function(req, res) {
        res.render('songs', {
            helpers: helpers,
            layout: '_common',
            relativeUrl: '/cv',
            pageGroup: '',
            pageTitle: 'Songs',
            songs: data().songs
        });
    });
};

