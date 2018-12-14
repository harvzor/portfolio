var data = function(fs, logger) {
    var marked = require('marked');
    var renderer = new marked.Renderer();
    var ampRenderer = new marked.Renderer();

    var linkRender = function(href, title, text) {
        return '<a target="_blank" href="'+ href +'">' + text + '</a>';
    };

    renderer.link = linkRender;

    ampRenderer.link = linkRender;

    ampRenderer.image = function(href, title, text) {
        return '<amp-img src="' + href + '" alt="' + text + '" layout="responsive" height="400" width="800"></amp-img>';
    };

    /**
     * Reads a file.
     * Will return HTML, even if the original format is Markdown.
     * @param {string} path
     * @param {boolean} isAmp
     */
    var getContent = function(path, isAmp) {
        let contents = fs.readFileSync('data/' + path, 'utf8');

        if (path.indexOf('.md') !== -1) {
            if (isAmp) {
                return marked(contents, { renderer: ampRenderer, sanitize: true });
            }

            return marked(contents, { renderer: renderer });
        }

        return contents;
    };

    var getJson = (dataLocation) => {
        let fileNames = fs.readdirSync('data/' + dataLocation);

        return fileNames
            .filter(fileName => fileName.indexOf('.json') !== -1)
            .map(fileName => {
                try {
                    let contents = fs.readFileSync('data/' +  dataLocation + '/' + fileName, 'utf8');

                    return JSON.parse(contents);
                } catch (e) {
                    logger.error(e);
                }
            });
    };

    var dataObject = {
        index: {
            pageTitle: ['Hello, World', 'Howdy, World', 'Wattup, World', 'Hey, World'],
            bodyText: getContent('index.md'),
            metaDescription: 'Hi. I am a web developer and tech enthusiast from England.'
        },
        about: {
            pageTitle: 'About me',
            bodyText: getContent('about.md'),
            metaDescription: 'Hi. I am a web developer and tech enthusiast from England.'
        },
        cv: {
            pageTitle: 'Looking for some new talent?',
            bodyText: getContent('cv.html'),
            metaDescription: 'Looking to hire a great developer? We might be a perfect match.'
        },
        songs: {
            pageTitle: 'Songs',
            songs: [],
            metaDescription: 'Some of my favourite songs.'
        },
        // Blog data.
        posts: [],
        // Project data.
        exampleGroups: [
            {
                //title: 'Personal projects',
                //info: 'Some projects I have worked on.',
                pages: []
            }
        ]
    };

    getJson('songs')
        .sort((songA, songB) => new Date(songA.date).getTime() < new Date(songB.date).getTime())
        .forEach(song => {
            dataObject.songs.songs.push(song);
        });

    //dataObject.posts =
    getJson('blog')
        .forEach(post => {
            if (post.published) {
                post.bodyText = getContent(post.bodyText);
                //post.ampBodyText = getContent(post.bodyText, true);

                dataObject.posts.push(post);
            }
        });

    getJson('projects')
        .map(project => {
            if (project.published) {
                project.bodyText = getContent(project.bodyText);

                dataObject.exampleGroups[0].pages.push(project);
            }
        });

    return dataObject;
}

module.exports = data;
