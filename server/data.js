var data = function(fs) {
	// Reads a file.
	var getData = function(path) {
		return fs.readFileSync('data/' + path, 'utf8');
	};

	var dataObject = {
		index: {
			bodyText: getData('index.html')
		},
		// Blog data.
		posts: [
			{
				href: 'stop-string-replacing-to-create-emails',
				title: 'Stop using string replace to create emails!',
				postDate: "Wed, 03 Feb 2016 00:00:00 GMT",
				summary: 'How to build HTML emails using Razor',
				bodyText: getData('blog/stop-string-replacing-to-create-emails.html')
			},
			{
				href: 'caching-umbraco-web-controllers',
				title: 'Caching Umbraco web API controllers',
				postDate: "Tue, 26 Jan 2016 00:00:00 GMT",
				summary: 'Caching improves load time for everyone. Here I explain how easily make caching work with Web API controllers.',
				bodyText: getData('blog/caching-umbraco-web-controllers.html')
			},
			{
				href: 'installing-iisnode',
				title: 'Installing IISNode for production',
				postDate: "Mon, 25 Jan 2016 00:00:00 GMT",
				summary: 'Developing Node.js applications on Windows is easy, but getting them setup for production can be a little more difficult.',
				bodyText: getData('blog/installing-iisnode.html')
			}
		],
		// Portfolio data.
		exampleGroups: [
			{
				title: 'Personal projects',
				info: 'These are the projects which I have freelanced on.',
				pages: [
					{
						href: 'artists-name-plates',
						cover: '/media/portfolio/artistsnameplates.jpg',
						name: 'Artists Name Plates',
						bodyText: getData('portfolio/artists-name-plates.html')
					},
					{
						href: 'harvey-williams',
						cover: '/media/portfolio/harveywilliams.png',
						name: 'This portfolio site',
						bodyText: getData('portfolio/harvey-williams.html')
					}
				]
			}
		]
	};

	return dataObject;
}

module.exports = data;

