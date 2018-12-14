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
        songs: [],
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

    getJson('songs')
        .forEach(song => {
            dataObject.songs.push(song);
        });

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
