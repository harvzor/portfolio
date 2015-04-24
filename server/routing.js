var routing = function(app, fs, express, data) {
	app.get('/', function(req, res) {
		var hours = new Date().getHours();
		if(hours >= 5 && hours < 12) {
			var timeOfDay = 'morning';
		} else if(hours >= 12 && hours < 17) {
			var timeOfDay = 'afternoon';
		} else if(hours >= 17 && hours < 21) {
			var timeOfDay = 'evening';
		} else if(hours >= 21 || hours < 5) {
			var timeOfDay = 'night';
		}
		
		res.render('page', {
			layout: 'common',
			pageGroup: 'home',
			pageTitle: 'Good ' + timeOfDay,
			bodyText: fs.readFileSync('data/index.html', 'utf8')
		});
	});

	app.get('/blog', function(req, res) {
		res.render('posts', {
			layout: 'common',
			pageGroup: 'blog',
			pageTitle: 'Blog', 
			posts: data.posts
		});
	});

	// Render blog posts
	for(var i = 0; i < data.posts.length; i++) {
		app.get('/blog/' + data.posts[i].href, function(req, res) {
			var url = req.originalUrl.split('/')[2]
				.split('?')[0];
			var post = data.posts.filterObjects('href', url)[0];

			var index = data.posts.map(function(x) { return x; }).indexOf(post);
			if(index > 0) {
				var prevPost = data.posts[index - 1];
			} else {
				var prevPost = data.posts[data.posts.length - 1];
			}
			if(index != data.posts.length - 1) {
				var nextPost = data.posts[index + 1];
			} else {
				var nextPost = data.posts[0];
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
			examples: data.examples
		});
	});

	// Render portfolio pages
	for(var i = 0; i < data.examples.length; i++) {
		app.get('/portfolio/' + data.examples[i].href, function(req, res) {
			var url = req.originalUrl.split('/')[2]
				.split('?')[0];
			var example = data.examples.filterObjects('href', url)[0];

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
				bodyText: example.bodyText
			});
		});
	}

	/////////////////
	// Statuses
	/////////////////
	app.use(express.static('./public'));

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

