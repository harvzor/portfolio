var data = function(fs) {
	// Reads a file.
	var getData = function(path) {
		return fs.readFileSync('data/' + path, 'utf8');
	};

	var dataObject = {
		songs: [
			{
				name: 'We Are The People',
				artist: 'Empire of the Sun',
				date: 'Thursday, 11 Aug 2016 00:00:00 GMT',
				url: 'https://www.youtube.com/watch?v=hN5X4kGhAtU'
			},
			{
				name: 'Paracetamol',
				artist: 'Declan Mckenna',
				date: 'Wed, 22 Jun 2016 00:00:00 GMT',
				url: 'https://www.youtube.com/watch?v=Db0BQ7JI4KE'
			},
			{
				name: 'Doing It To Death',
				artist: 'The Kills',
				date: 'Sat, 16 Apr 2016 00:00:00 GMT',
				url: 'https://www.youtube.com/watch?v=498zUzNGQxY'
			}
		],
		index: {
			bodyText: getData('index.html')
		},
		cv: {
			bodyText: getData('cv.html')
		},
		// Blog data.
		posts: [
			{
				href: 'potentially-useful-programs-for-the-budding-computerphile',
				metaDescription: 'A list of programs that I find useful in day to day life with my computer.',
				title: 'Potentially useful programs for the budding computerphile',
				postDate: 'Tue, 21 Jun 2016 00:00:00 GMT',
				summary: 'There are many programs I use in day to day life to help speed up or complement my workflow. Here are a few of the nicher ones which you may not have heard of.',
				bodyText: getData('blog/potentially-useful-programs-for-the-budding-computerphile.html')
			},
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
			},
			{
				href: 'making-umbraco-nodes-with-the-models-builder',
				metaDescription: 'In my latest Umbraco website built I have been getting friendly with the new Models Builder that is included by default. In this post I show how the Models Builder can be used with the Content Service to create new Umbraco nodes programmatically.',
				title: 'Making Umbraco Nodes with the Models Builder',
				postDate: 'Sun, 20 Mar 2016 00:00:00 GMT',
				summary: 'In my latest Umbraco website built I have been getting friendly with the new Models Builder that is included by default. In this post I show how the Models Builder can be used with the Content Service to create new Umbraco nodes programmatically.',
				bodyText: getData('blog/making-umbraco-nodes-with-the-models-builder.html'),
			}
		],
		// Project data.
		exampleGroups: [
			{
				title: 'Personal projects',
				info: 'These are the projects which I have worked on.',
				pages: [
					{
						href: 'artists-name-plates',
						metaDescription: 'I built a website for Artists Name Plates - an ecommerce site that allows users to buy name plates for paintings.',
						cover: '/media/projects/artistsnameplates.jpg',
						name: 'Artists Name Plates',
						bodyText: getData('projects/artists-name-plates.html')
					},
					{
						href: 'harvey-williams',
						metaDescription: 'I built this website using Node.JS and "love".',
						cover: '/media/projects/harveywilliams.png',
						name: 'This portfolio site',
						bodyText: getData('projects/harvey-williams.html')
					}
				]
			}
		]
	};

	return dataObject;
}

module.exports = data;

