/////////////////
// Config
/////////////////
var config = {
	ip: '127.0.0.1',
	port: 3000,
	type: 'iis' // 'iis' or 'node'
};

/////////////////
// Start website
/////////////////
var express = require('express');
var expressLayouts = require('express-ejs-layouts');
var fs = require('fs');

var app = express();

/////////////////
// Functions
/////////////////
Array.prototype.filterObjects = function(key, value) {
	return this.filter(function(x) { return x[key] === value; })
}

app.locals.year = function() {
	return new Date().getUTCFullYear();
}

/////////////////
// Templating
/////////////////
app.set('view engine', 'ejs');

app.use(expressLayouts)

app.get('/', function(req, res) {
	res.render('page', {
		layout: 'common',
		pageGroup: 'home',
		pageTitle: 'Home',
		bodyText: fs.readFileSync('data/index.html', 'utf8')
	});
});

var posts = [
	{
		href: 'hosting-with-iisnode',
		title: 'Hosting websites with IISNode on a Windows server',
		summary: 'Developing Node.js applications on Windows is easy, but getting them setup for production can be a little more difficult.',
		bodyText: fs.readFileSync('data/blog/hosting-with-iisnode.html', 'utf8')
	},
	{
		href: 'umbraco',
		title: 'Umbraco',
		summary: 'Read the advantages and disadvantages of using Umbraco.',
		bodyText: fs.readFileSync('data/blog/umbraco.html', 'utf8')
	},
	{
		href: 'why-umbraco',
		title: 'Why Umbraco?',
		summary: 'At first I was skepticle of Umbraco, but read how I soon learnt that that it was a joy to work with, and a very modern CMS.',
		bodyText: fs.readFileSync('data/blog/why-umbraco.html', 'utf8')
	}
];

app.get('/blog', function(req, res) {
	res.render('blog', {
		layout: 'common',
		pageGroup: 'blog',
		pageTitle: 'Blog', 
		posts: posts
	});
});

// Render blog posts
for(var i = 0; i < posts.length; i++) {
	app.get('/blog/' + posts[i].href, function(req, res) {
		var url = req.originalUrl.split('/')[2]
			.split('?')[0];
		var post = posts.filterObjects('href', url)[0];

		res.render('post', {
			layout: 'common',
			pageGroup: 'blog',
			pageTitle: post.title,
			bodyText: post.bodyText
		});
	});
}

// Portfolio data
var examples = [
	{
		href: 'the-phone-coop',
		cover: 'coop.jpg',
		name: 'The Phone Coop',
		bodyText: ''
	},
	{
		href: 'artists-name-plates',
		cover: 'artistsnameplates.jpg',
		name: 'Artists Name Plates',
		bodyText: ''
	},
	{
		href: 'skyval',
		cover: 'skyval.jpg',
		name: 'Skyval',
		bodyText: ''
	}
];

// Render portfolio parent
app.get('/portfolio', function(req, res) {
	res.render('portfolio', {
		layout: 'common',
		pageGroup: 'portfolio',
		pageTitle: 'Portfolio',
		examples: examples
	});
});

// Render portfolio pages
for(var i = 0; i < examples.length; i++) {
	app.get('/portfolio/' + examples[i].href, function(req, res) {
		var url = req.originalUrl.split('/')[2]
			.split('?')[0];
		var example = examples.filterObjects('href', url)[0];

		res.render('post', {
			layout: 'common',
			pageGroup: 'portfolio',
			pageTitle: example.name,
			bodyText: example.bodyText
		});
	});
}

/////////////////
// Statuses
/////////////////
app.use(express.static(__dirname + '/public'));
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

/////////////////
// Inititialise
/////////////////

if(config.type == 'node') {
	// Used for Node server.
	var server = app.listen(config.port, config.ip, function () {
		var host = server.address().address;
		var port = server.address().port;

		console.log('Website listening at http://%s:%s', host, port);
	});
} else if(config.type == 'iis') {
	// Used for IISNode.
	app.listen(process.env.PORT);
} else {
	console.log('Error: wrong config.type set');
}

