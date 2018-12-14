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
        songs: [
            {
                name: 'Blood In The Cut',
                artist: 'K.Flay',
                date: 'Fri, 20 Apr 2018 00:00:00 GMT',
                id: 'DMA4vDwP7n4'
            },
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
            bodyText: getContent('index.md')
        },
        about: {
            bodyText: getContent('about.md')
        },
        cv: {
            bodyText: getContent('cv.html')
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

    getJson('blog')
        .forEach(post => {
            if (post.published) {
                post.bodyText = getContent(post.bodyText);
                //post.ampBodyText = getContent(post.bodyText, true);

                dataObject.posts.push(post);
            }
        });

    getJson('projects')
        .forEach(project => {
            if (project.published) {
                project.bodyText = getContent(project.bodyText);

                dataObject.exampleGroups[0].pages.push(project);
            }
        });

    return dataObject;
}

module.exports = data;
