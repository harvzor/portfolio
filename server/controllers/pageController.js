module.exports = function(app, fs, express, config, logger, data, helpers) {
    app.get('/about', function(req, res) {
        let about = data().about;

        res.render('page', {
            layout: '_common',
            relativeUrl: '',
            metaDescription: about.metaDescription,
            pageGroup: 'about',
            pageTitle: about.pageTitle,
            bodyText: about.bodyText
        });
    });

    app.get('/cv', function(req, res) {
        let cv = data().cv;

        res.render('page', {
            layout: '_common',
            relativeUrl: '/cv',
            metaDescription: cv.metaDescription,
            pageGroup: '',
            pageTitle: cv.pageTitle,
            bodyText: cv.bodyText
        });
    });

    app.get('/songs', function(req, res) {
        let songs = data().songs;

        res.render('songs', {
            helpers: helpers,
            layout: '_common',
            relativeUrl: '/songs',
            metaDescription: songs.metaDescription,
            pageGroup: '',
            pageTitle: songs.pageTitle,
            songs: songs.songs
        });
    });
};
