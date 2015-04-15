var express = require('express');
var app = express();
var expressLayouts = require('express-ejs-layouts');

/////////////////
// Templating
/////////////////
app.set('view engine', 'ejs');

app.use(expressLayouts)

app.get('/', function(req, res) {
	var bodyText = '<h2>A short introduction</h2><p>Hi. I\'m a web developer based in Oxford. I prefer backend development, and I have experience with PHP, but my favourite language is C#. I can also do front end development with HTML5, CSS3 (but preferably Sass) and JS. I\'m a big fan of modular programming, and doing it right the first time. </p><p>At the moment I\'m working for a great company called <a href="http://growcreate.co.uk">GrowCreate</a> located just outside of Oxford. At GrowCreate I develop for an open source CMS called <a href="/blog/why-umbraco.html">Umbraco</a>, which is built on top of ASP.NET.</p><h3>Say that again, but without the jargon</h3><p>Basically, I can build websites. If you\'re interested in my skills, then give me a buzz.</p><h3>Need to see more?</h3><p>Then take a look at my <a href="portfolio">portfolio</a> which shows work I\'ve done on my own, or with GrowCreate. If you\'re techy and you want to see code, then take a look at my <a href="https://github.com/HarveyWilliams">GitHub</a> profile - you can even see the source files for this website.</p><h3>Interests</h3><p>I\'m a bit of a nerd, and I love pretty much anything open source. I\'m a major fan of the Linux operating system, and I love to tweak Firefox to look and work exactly how I like it. Whenever I\'m working, and pretty much whenever there\'s a moment of silence, I like to listen to music. Anything with a guitar and an indie feel I\'ll like.</p>';

	res.render('page', {
		layout: 'common',
		pageTitle: 'Home',
		bodyText: bodyText
	});
});

var posts = [
	{
		href: 'umbraco',
		title: 'Umbraco',
		summary: 'Read the advantages and disadvantages of using Umbraco.',
		bodyText: '<p>There\'s no doubt about it, Umbraco is a great CMS. But every CMS comes with advantages and disadvantages. Below I have outlined them. </p><h3>Advantages</h3><h4>Free and open source</h4><p>Umbraco has always been open source, and with the addition of ASP.NET being made fully open source by Microsoft, it makes Umbraco a truely open CMS.</p><h4>Easy to extend</h4><p>Hooking into Umbraco to control what happens before or after a page is published is a piece of cake, usually only requiring an extra line of code.</p><h4>Modern back office</h4><p>The backend for Umbraco was newly redesigned with the latest version. Everything is designed to be like a single page application, where new information is loaded in using JS rather than new page requests. This makes the backend run seamlessly when you create new content.</p><h3>Disadvantages</h3><h4>Steep learning curve</h4><p>Installing a CMS like Wordpress is extremely easy, simply drop the files into the right WAMP or MAMP directory, and bring in a fresh database. With Umbraco it\'s a whole different beast. SQL Server and IIS must both be first installed, with the version of .NET which you want to use. This isn\'t an obvious process, and without some proper help, I never would have managed to get started with Umbraco.</p><h4>Expensive to run</h4><p>Linux servers cost hardly nothing when compared to a Windows server. The minimal amount you can expect to spend on a bare bones Linux server is £3 and above, a Windows server will cost at least £10. Not to mention, that if you want to have a particularly large database exceeding 10GB in side, then you will have to pay out a license for SQL Server. All in all, Umbraco ends up as an expensive piece of kit to run.</p><h4>Small community</h4><p>In comparison to something as popular as Wordpress, Umbraco does have a small community. This isn\'t to say that Umbraco has a small community. It\'s still large, and vibrant. Because of this community, and because the software is open source, we can be sure that the CMS won\'t be disappearing any time soon.</p>'
	},
	{
		href: 'why-umbraco',
		title: 'Why Umbraco?',
		summary: 'At first I was skepticle of Umbraco, but read how I soon learnt that that it was a joy to work with, and a very modern CMS.',
		bodyText: '<p>When I first started working at GrowCreate, I wasn\'t sure what to expect. The only previous experience in a backend language was PHP. This language was great because it is fast, easy to use and simple to get into. Suddenly, it was up to me to get to grips with a new language which I had never even considered - C#. The reason Grow uses this language is because their CMS of choice is built on it.</p><p>At first I was skepticle of Umbraco and the programming language it was built on. ASP.NET and C# are both maintained by Microsoft, and up until recently were closed source. This meant that the language lived and died with Microsoft. Not to mention there were drawbacks of using C# as it\'s not super popular, and is a slow language when compared to something like PHP. However, I soon found that developing with this language in Microsofts bespoke IDE called Visual Studio is a joy.</p><h3>Visual Studio</h3><p>Visual Studio has a great feature called Intellisense which gives you clues about what to write by telling you what functions are available. At first I was concerned that relying on an IDE too much would hold me back further down the road, but now I realise that being a great programmer isn\'t about learning the syntax, but understanding the underlying concepts of proramming. Intellisense speeds up my development speeds, and I could hardly live without it now.</p><h3>C# and ASP.NET is extensible</h3><p>The way which C# requires you to work (being a strongly typed language) means that you have to know what you\'re typing. Unlike in a language like JS, you must say what your variable represents in each method, which helps when you call that method later on.</p><h3>But wait, why Umbraco?</h3><p>To get back to the point at hand, because Visual Studio as C# are such great tools to work with, Umbraco too is a fun CMS to work on. You can extend it easily with minimal effort, hooking into its processes with only a couple of lines of code.</p><p>And there\'s tons of other perks too - the backend extremely modern having been built in Angular, so it works like a single page application and runs fast because of this.</p>'
	}
];

app.get('/blog', function(req, res) {
	res.render('blog', {
		layout: 'common',
		pageTitle: 'Blog', 
		posts: posts
	});
});

// Render blog posts
app.get('/blog/' + posts[0].href, function(req, res) {
	var post = posts[0];

	res.render('post', {
		layout: 'common',
		pageTitle: post.title,
		bodyText: post.bodyText
	});
});

app.get('/blog/' + posts[1].href, function(req, res) {
	var post = posts[1];

	res.render('post', {
		layout: 'common',
		pageTitle: post.title,
		bodyText: post.bodyText
	});
});

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
		pageTitle: 'Portfolio',
		examples: examples
	});
});

// Render portfolio pages
app.get('/portfolio/' + examples[0].href, function(req, res) {
	var example = examples[0];

	res.render('post', {
		layout: 'common',
		pageTitle: example.title,
		bodyText: example.bodyText
	});
});

/////////////////
// Statuses
/////////////////
app.use(express.static(__dirname + '/public'));
app.use(function(req, res, next) {
	res.status(404).render('page', {
		layout: 'common',
		pageTitle: 'Status: 404',
		bodyText: '<p>You\'re looking for a page that doesn\'t exist...</p>'
	});
});

app.use(function(err, req, res, next) {
	console.error(err.stack);
	res.status(500).render('page', {
		layout: 'common',
		pageTitle: 'Status: 500',
		bodyText: '<p>So sorry, but a problem occured! Please email me if this problem persists.</p>'
	});
});

/////////////////
// Inititialise
/////////////////

var server = app.listen(3000, function () {
	var host = server.address().address;
	var port = server.address().port;

	console.log('Example app listening at http://%s:%s', host, port);
});

