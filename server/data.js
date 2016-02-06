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
				href: 'rendering-mvc-emails-with-cshtml',
				metaDescription: 'Learn to build HTML emails using MVC, Razor and CSHTML.',
				title: 'How to render MVC emails with CSHTML',
				postDate: 'Wed, 06 Feb 2016 00:00:00 GMT',
				summary: 'Tired of using string formatting to create emails in your code? Read here to find out about how to build HTML emails using MVC, Razor and CSHTML.',
				bodyText: getData('blog/rendering-mvc-emails-with-cshtml.html')
			},
			{
				href: 'caching-umbraco-web-controllers',
				metaDescription: 'Find out how to cache an Umbraco surface controller.',
				title: 'Caching Umbraco web API controllers',
				postDate: 'Tue, 26 Jan 2016 00:00:00 GMT',
				summary: 'Caching improves load time for everyone. Here I explain how easily make caching work with Web API controllers.',
				bodyText: getData('blog/caching-umbraco-web-controllers.html')
			},
			{
				href: 'installing-iisnode',
				metaDescription: 'Follow this step by step tutorial on how to set up IISNode on Windows and get your first Node website hosted using IISNode.',
				title: 'Installing IISNode for production',
				postDate: 'Mon, 25 Jan 2016 00:00:00 GMT',
				summary: 'Developing Node.js applications on Windows is easy, but getting them setup for production can be a little more difficult. Read this post to discover how to set up IISNode in Windows and get a Node application running within IIS.',
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
						metaDescription: 'I built a website for Artists Name Plates - an ecommerce site that allows users to buy name plates for paintings.',
						cover: '/media/portfolio/artistsnameplates.jpg',
						name: 'Artists Name Plates',
						bodyText: getData('portfolio/artists-name-plates.html')
					},
					{
						href: 'harvey-williams',
						metaDescription: 'I built this website using Node.JS and "love".',
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

