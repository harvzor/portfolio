var express = require('express');
var app = express();
var expressLayouts = require('express-ejs-layouts');

/////////////////
// Templating
/////////////////
app.set('view engine', 'ejs');

app.use(expressLayouts)

app.get('/', function(req, res) {
	res.render('page', { layout: 'layout', pageTitle: 'Home', bodyText: '<h2>A short introduction</h2><p>Hi. I\'m a web developer based in Oxford. I prefer backend development, and I have experience with PHP, but my favourite language is C#. I can also do front end development with HTML5, CSS3 (but preferably Sass) and JS. I\'m a big fan of modular programming, and doing it right the first time. </p><p>At the moment I\'m working for a great company called <a href="http://growcreate.co.uk">GrowCreate</a> located just outside of Oxford. At GrowCreate I develop for an open source CMS called <a href="/blog/why-umbraco.html">Umbraco</a>, which is built on top of ASP.NET.</p><h3>Say that again, but without the jargon</h3><p>Basically, I can build websites. If you\'re interested in my skills, then give me a buzz.</p><h3>Need to see more?</h3><p>Then take a look at my <a href="portfolio.html">portfolio</a> which shows work I\'ve done on my own, or with GrowCreate. If you\'re techy and you want to see code, then take a look at my <a href="https://github.com/HarveyWilliams">GitHub</a> profile - you can even see the source files for this website.</p><h3>Interests</h3><p>I\'m a bit of a nerd, and I love pretty much anything open source. I\'m a major fan of the Linux operating system, and I love to tweak Firefox to look and work exactly how I like it. Whenever I\'m working, and pretty much whenever there\'s a moment of silence, I like to listen to music. Anything with a guitar and an indie feel I\'ll like.</p>'});
});

app.get('/blog', function(req, res) {
	res.render('blog', { layout: 'layout', pageTitle: 'Blog', blogTitle: 'Umbraco'});
});

/////////////////
// Statuses
/////////////////
/*
app.use(function(req, res, next) {
	res.status(404).send('Sorry cant find that!');
});

app.use(function(err, req, res, next) {
	console.error(err.stack);
	res.status(500).send('Something broke!');
});
*/

/////////////////
// Inititialise
/////////////////
app.use(express.static(__dirname + '/public'));

var server = app.listen(3000, function () {
	var host = server.address().address;
	var port = server.address().port;

	console.log('Example app listening at http://%s:%s', host, port);
});

