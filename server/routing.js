var routing = function(app, fs, express, config, logger) {
	var firstRun = true;
	var dataPath = '../server/data.js';
	var dataModule = require(dataPath);
	var helpers = require('../server/helpers.js');
	var actualData;

	// Reloads the data if in dev mode, better for writing new posts!
	var data = function() {
		if (firstRun || config.dev) {
			firstRun = false;

			actualData = dataModule(fs);
		}

		return actualData;
	};

	app.get('/', function(req, res) {
		logger.info('Serving index.');

		res.render('page', {
			layout: 'common',
			relativeUrl: '',
			metaDescription: 'Hi. I am a young experienced web developer living near Oxford. I specialise in Umbraco CMS development.',
			pageGroup: 'home',
			pageTitle: 'Hello World',
			bodyText: data().index.bodyText
		});
	});

	app.get('/cv', function(req, res) {
		res.render('page', {
			layout: 'common',
			relativeUrl: '/cv',
			metaDescription: 'Looking to hire a great developer? We might be a perfect match.',
			pageGroup: 'home',
			pageTitle: 'Looking for some new talent?',
			bodyText: data().cv.bodyText
		});
	});

	/*
	app.get('/8tracks', function(req, res) {
		res.render('page', {
			layout: 'common',
			pageGroup: '',
			pageTitle: '8Tracks',
			bodyText: fs.readFileSync('data/8tracks.html', 'utf8')
		});
	});
	*/

	app.get('/blog', function(req, res) {
		logger.info('tag: %s', req.query.tag);

		var posts = data().posts;

		var tagsWithQuantity = helpers.getBlogTags(data());

		if (req.query.tag) {
			posts = posts.filter(function(post) {
				return post.tags.indexOf(req.query.tag) > -1;
			});
		}

		res.render('posts', {
			helpers: helpers,
			layout: 'common',
			relativeUrl: 'blog',
			metaDescription: 'Read about my latest thoughts and experiences in the world of web development.',
			pageGroup: 'blog',
			pageTitle: 'Blog', 
			// Order posts by date.
			posts: posts.sort(function(a, b) {
				return new Date(b.postDate).getTime() - new Date(a.postDate).getTime();
			}),
			tags: tagsWithQuantity,
			currentTag: req.query.tag
		});
	});

	// Render blog posts.
	for(var i = 0; i < data().posts.length; i++) {
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
				layout: 'common',
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
				nextPost: nextPost
			});
		});
	}

	// Redirect old portfolio link to projects.
	app.get('/portfolio', function(req, res) {
		res.redirect('/projects');
	});

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

	/////////////////
	// Statuses
	/////////////////
	app.use(express.static('./public'));

	if(global.dev == true) {
		app.use(express.static('./src'));
	}

	app.use(function(req, res, next) {
		logger.info('404 error: %s', req.originalUrl);

		res.status(404).render('page', {
			layout: 'common',
			relativeUrl: '404',
			pageGroup: '',
			pageTitle: 'Status: 404',
			bodyText: '<p>You\'re looking for a page that doesn\'t exist...</p>'
		});
	});

	app.use(function(err, req, res, next) {
		logger.error('500 error: %s', err.stack);

		res.status(500).render('page', {
			layout: 'common',
			relativeUrl: '500',
			pageGroup: '',
			pageTitle: 'Status: 500',
			bodyText: '<p>So sorry, but a problem occured! Please email me if this problem persists.</p>'
		});
	});
};

module.exports = routing;

