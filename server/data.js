var data = function(fs) {
    var marked = require('marked');

    // Reads a file.
    var getData = function(path) {
        var contents = fs.readFileSync('data/' + path, 'utf8');

        if (path.indexOf('.md') !== -1) {
            return marked(contents);
        }

        return contents;
    };

    var dataObject = {
        songs: [
            {
                name: 'Renn!',
                artist: 'Enno Bunger',
                date: 'Wed, 26 Oct 2016 00:00:00 GMT',
                id: 'SmBP2lMhEnE'
            },
            {
                name: 'Barfuß Am Klavier',
                artist: 'AnnenMayKantereit',
                date: 'Sat, 15 Oct 2016 00:00:00 GMT',
                id: 'tERRFWuYG48'
            },
            {
                name: 'Me Gustas Tu',
                artist: 'Manu Chao',
                date: 'Sun, 25 Sep 2016 00:00:00 GMT',
                id: 'rs6Y4kZ8qtw'
            },
            {
                name: 'We Are The People',
                artist: 'Empire of the Sun',
                date: 'Thu, 11 Aug 2016 00:00:00 GMT',
                id: 'hN5X4kGhAtU'
            },
            {
                name: 'Paracetamol',
                artist: 'Declan Mckenna',
                date: 'Wed, 22 Jun 2016 00:00:00 GMT',
                id: 'Db0BQ7JI4KE'
            },
            {
                name: 'Doing It To Death',
                artist: 'The Kills',
                date: 'Sat, 16 Apr 2016 00:00:00 GMT',
                id: '498zUzNGQxY'
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
                href: 'getting-the-length-in-seconds-for-mp3-files-in-a-folder',
                metaDescription: 'Find out how you can use NodeJS to get the play time length in seconds of a group of MP3 files in a folder.',
                title: 'Determining the length in seconds of a folder of MP3 files using NodeJS',
                postDate: 'Sun, 08 Jan 2017 00:00:00 GMT',
                summary: 'NodeJS is a great quick and easy tool which allows you to quickly hack together any script which can save you time. In this post I show how I used Node to get the length in seconds of a bunch of MP3 files in the folder.',
                bodyText: getData('blog/getting-the-length-in-seconds-for-mp3-files-in-a-folder.md'),
                tags: ['nodejs', 'programming']
            },
            {
                href: 'understanding-threads-and-static-classes-in-csharp',
                metaDescription: 'Writing static classes can cause problems if thread safety isn\'t properly considered. In a program I helped write, some surprising results occured which could have easily been avoided by ensuring my properties weren\'t getting shared between threads.',
                title: 'Understanding Threads and Static Classes in C#',
                postDate: 'Wed, 26 Oct 2016 00:00:00 GMT',
                summary: 'Writing static classes can cause problems if thread safety isn\'t properly considered. In a program I helped write, some surprising results occured which could have easily been avoided by ensuring my properties weren\'t getting shared between threads. Read on to find out what I learned...',
                bodyText: getData('blog/understanding-threads-and-static-classes-in-csharp.md'),
                tags: ['csharp', 'programming']
            },
            {
                href: 'potentially-useful-programs-for-the-budding-computerphile',
                metaDescription: 'A list of programs that I find useful in day to day life with my computer.',
                title: 'Potentially useful programs for the budding computerphile',
                postDate: 'Sun, 25 Sep 2016 00:00:00 GMT',
                summary: 'There are many programs I use in day to day life to help speed up or complement my workflow. Here are a few of the nicher ones which you may not have heard of.',
                bodyText: getData('blog/potentially-useful-programs-for-the-budding-computerphile.html'),
                tags: ['miscellaneous']
            },
            {
                href: 'rendering-mvc-emails-with-cshtml',
                metaDescription: 'Learn to build HTML emails using MVC, Razor and CSHTML.',
                title: 'How to render MVC emails with CSHTML',
                postDate: 'Wed, 06 Feb 2016 00:00:00 GMT',
                summary: 'Tired of using string formatting to create emails in your code? Read here to find out about how to build HTML emails using MVC, Razor and CSHTML.',
                bodyText: getData('blog/rendering-mvc-emails-with-cshtml.html'),
                tags: ['csharp', 'programming']
            },
            {
                href: 'caching-umbraco-web-controllers',
                metaDescription: 'Find out how to cache an Umbraco surface controller.',
                title: 'Caching Umbraco web API controllers',
                postDate: 'Tue, 26 Jan 2016 00:00:00 GMT',
                summary: 'Caching improves load time for everyone. Here I explain how easily make caching work with Web API controllers.',
                bodyText: getData('blog/caching-umbraco-web-controllers.html'),
                tags: ['csharp', 'umbraco', 'programming']
            },
            {
                href: 'installing-iisnode',
                metaDescription: 'Follow this step by step tutorial on how to set up IISNode on Windows and get your first Node website hosted using IISNode.',
                title: 'Installing IISNode for production',
                postDate: 'Mon, 25 Jan 2016 00:00:00 GMT',
                summary: 'Developing Node.js applications on Windows is easy, but getting them setup for production can be a little more difficult. Read this post to discover how to set up IISNode in Windows and get a Node application running within IIS.',
                bodyText: getData('blog/installing-iisnode.html'),
                tags: ['nodejs', 'programming']
            },
            {
                href: 'making-umbraco-nodes-with-the-models-builder',
                metaDescription: 'In my latest Umbraco website built I have been getting friendly with the new Models Builder that is included by default. In this post I show how the Models Builder can be used with the Content Service to create new Umbraco nodes programmatically.',
                title: 'Making Umbraco Nodes with the Models Builder',
                postDate: 'Sun, 20 Mar 2016 00:00:00 GMT',
                summary: 'In my latest Umbraco website built I have been getting friendly with the new Models Builder that is included by default. In this post I show how the Models Builder can be used with the Content Service to create new Umbraco nodes programmatically.',
                bodyText: getData('blog/making-umbraco-nodes-with-the-models-builder.html'),
                tags: ['umbraco', 'csharp', 'programming']
            }
        ],
        // Project data.
        exampleGroups: [
            {
                title: 'Personal projects',
                info: 'These are the projects which I have worked on.',
                pages: [
                    {
                        href: 'umbraco-iconator',
                        metaDescription: 'A simple package that lets Umbraco users select icons in the backoffice to be displayed on the front end.',
                        cover: '',
                        cover: '/media/projects/umbraco-iconator/IconPickerDialog.png',
                        name: 'Umbraco Iconator',
                        bodyText: getData('projects/umbraco-iconator.html')
                    },
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

