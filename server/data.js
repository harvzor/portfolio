var data = function(fs) {
	var dataObject = {
		// Blog data
		posts: [
			{
				href: 'installing-iisnode',
				title: 'Installing IISNode for production',
				summary: 'Developing Node.js applications on Windows is easy, but getting them setup for production can be a little more difficult.',
				bodyText: fs.readFileSync('data/blog/installing-iisnode.html', 'utf8')
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
		exampleGroups: [
			{
				title: 'Personal projects',
				info: 'These are the projects which I\'ve worked on by myself.',
				pages: [
					{
						href: 'artists-name-plates',
						cover: 'artistsnameplates.jpg',
						name: 'Artists Name Plates',
						bodyText: fs.readFileSync('data/portfolio/artists-name-plates.html', 'utf8')
					},
					{
						href: 'harvey-williams',
						cover: 'harveywilliams.jpg',
						name: 'This portfolio site',
						bodyText: ''
					},
					{
						href: 'harvey-williams',
						cover: 'harveywilliams.jpg',
						name: 'This portfolio site',
						bodyText: ''
					}
				]
			},
			{
				title: 'GrowCreate',
				info: 'Below are projects which I have done at GrowCreate, usually as part of a team.',
				pages: [
					{
						href: 'skyval',
						cover: 'skyval.jpg',
						name: 'Skyval',
						bodyText: fs.readFileSync('data/portfolio/skyval.html', 'utf8')
					},
					{
						href: 'the-phone-coop',
						cover: 'coop.jpg',
						name: 'The Phone Coop',
						bodyText: fs.readFileSync('data/portfolio/the-phone-coop.html', 'utf8')
					},
					{
						href: 'carewatch',
						cover: 'carewatch.jpg',
						name: 'Carewatch',
						bodyText: fs.readFileSync('data/portfolio/carewatch.html', 'utf8')
					},
					{
						href: 'stokers',
						cover: 'stokers.jpg',
						name: 'Stokers',
						bodyText: fs.readFileSync('data/portfolio/stokers.html', 'utf8')
					},
					{
						href: 'beerbods',
						cover: 'beerbods.jpg',
						name: 'Beerbods',
						bodyText: fs.readFileSync('data/portfolio/beerbods.html', 'utf8')
					}
				],
			}
		]
	};

	return dataObject;
}

module.exports = data;

