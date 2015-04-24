var data = function(fs) {
	var dataObject = {
		// Blog data
		posts: [
			{
				href: 'hosting-with-iisnode',
				title: 'Hosting websites with IISNode',
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
		],
		// Portfolio data
		examples: [
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
		]
	};

	return dataObject;
}

module.exports = data;

