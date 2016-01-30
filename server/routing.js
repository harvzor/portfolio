var routing = function(app, fs, express, config) {
	var firstRun = true;
	var dataPath = '../server/data.js';
	var dataModule = require(dataPath);
	var actualData;

	// Reloads the data if in dev mode, better for writing new posts!
	var data = function() {
		if (firstRun || config.dev) {
			firstRun = false;

			actualData = dataModule(fs);
		}

		return actualData;
	}

	app.get('/', function(req, res) {
		res.render('page', {
			layout: 'common',
			pageGroup: 'home',
			pageTitle: 'Hi',
			bodyText: data().index.bodyText
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
		res.render('posts', {
			layout: 'common',
			pageGroup: 'blog',
			pageTitle: 'Blog', 
			posts: data().posts
		});
	});

	// Render blog posts
	for(var i = 0; i < data().posts.length; i++) {
		app.get('/blog/' + data().posts[i].href, function(req, res) {
			var url = req.originalUrl.split('/')[2]
				.split('?')[0];
			var post = data().posts.filterObjects('href', url)[0];

			var index = data().posts.map(function(x) { return x; }).indexOf(post);
			if(index > 0) {
				var prevPost = data().posts[index - 1];
			} else {
				var prevPost = data().posts[data().posts.length - 1];
			}
			if(index != data().posts.length - 1) {
				var nextPost = data().posts[index + 1];
			} else {
				var nextPost = data().posts[0];
			}

			res.render('post', {
				layout: 'common',
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

	// Render portfolio parent
	app.get('/portfolio', function(req, res) {
		res.render('portfolio-examples', {
			layout: 'common',
			pageGroup: 'portfolio',
			pageTitle: 'Portfolio',
			exampleGroups: data().exampleGroups
		});
	});

	var examplePages = [];
	for(var i = 0; i < data().exampleGroups.length; i++) {
		examplePages = examplePages.concat(data().exampleGroups[i].pages);
	}

	// Render portfolio pages
	for(var i = 0; i < examplePages.length; i++) {
		app.get('/portfolio/' + examplePages[i].href, function(req, res) {
			var url = req.originalUrl.split('/')[2]
				.split('?')[0];
			var example = examplePages.filterObjects('href', url)[0];

			res.render('portfolio-example', {
				layout: 'common',
				pageGroup: 'portfolio',
				parentPages: [
					{
						title: 'portfolio',
						href: '/portfolio'
					}
				],
				pageTitle: example.name,
				cover: example.cover,
				bodyText: example.bodyText
			});
		});
	}

	/////////////////
	// Statuses
	/////////////////
	app.use(express.static('./public'));

	if(global.dev == true) {
		app.use(express.static('./src'));
	}

	app.use(function(req, res, next) {
		res.status(404).render('page', {
			layout: 'common',
			pageGroup: '',
			pageTitle: 'Status: 404',
			bodyText: '<p>You\'re looking for a page that doesn\'t exist...</p>'
		});
	});

	app.use(function(err, req, res, next) {
		console.error(err.stack);
		res.status(500).render('page', {
			layout: 'common',
			pageGroup: '',
			pageTitle: 'Status: 500',
			bodyText: '<p>So sorry, but a problem occured! Please email me if this problem persists.</p>'
		});
	});
}

module.exports = routing;

