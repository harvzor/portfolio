import marked = require('marked');
import fs = require('fs');

import * as config from './config.json'
import helpers from './helpers';
import logger from './logger' ;

const renderer = function() {
    var renderer = new marked.Renderer();
    var ampRenderer = new marked.Renderer();

    var linkRender = function(href, title, text) {
        // If it is an external link...
        if (href.startsWith('http')) {
            return '<a target="_blank" href="'+ href +'">' + text + '</a>';
        }

        return '<a href="'+ href +'">' + text + '</a>';
    };

    renderer.link = linkRender;

    ampRenderer.link = linkRender;

    ampRenderer.image = function(href, title, text) {
        return '<amp-img src="' + href + '" alt="' + text + '" layout="responsive" height="400" width="800"></amp-img>';
    };

    return {
        normal: renderer,
        amp: ampRenderer
    };
}();

const data = function() {
    logger.info('data running');

    var actualData = null;

    /**
     * Reads a file.
     * Will return HTML, even if the original format is Markdown.
     * @param {string} path
     * @param {boolean} isAmp
     */
    var getContent = function(path: string, isAmp?: Boolean) {
        let contents = fs.readFileSync('data/' + path, 'utf8');

        if (path.indexOf('.md') !== -1) {
            if (isAmp) {
                return marked(contents, { renderer: renderer.amp, sanitize: true });
            }

            return marked(contents, { renderer: renderer.normal })
                // Replace YouTube links with an embedded YouTube video.
                .replace(
                    /<p><a target="_blank" href=\"(?:https:\/\/www\.youtube\.com\/watch\?v=){1}(.*)\">([^<]*)<\/a><\/p>/gm,
                    `<a class="youtube-video" href="https://www.youtube.com/embed/$1" target="_blank" style="background-image:url('https://img.youtube.com/vi/$1/maxresdefault.jpg')" data-id="$1"><div class="icon-play youtube-video-play"></div><div class="youtube-video-title">$2</div></a>`
                );
        }

        return contents;
    };

    var findData = (dir: string, data?: any) => {
        data = data || {};
        let paths = fs.readdirSync(dir);

        // Foreach of the JSON files...
        paths
            .filter(path => path.includes('.json'))
            .forEach(path => {
                let fullPath = dir + '/' + path;

                try {
                    let contents = fs.readFileSync(fullPath, 'utf8');
                    let json = JSON.parse(contents);

                    // If it's in dev mode, then the unpublished blog posts should show.
                    if (typeof json.published !== 'undefined' && !json.published && !config.dev) {
                        return;
                    }

                    if (typeof json.bodyText !== 'undefined') {
                        json.bodyText = getContent(json.bodyText);

                        //json.ampBodyText = getContent(page.bodyText, true);
                    }

                    // The lastmod tag is optional in sitmaps and in most of the cases it's ignored by search engines
                    // https://stackoverflow.com/a/31354426
                    //json.lastModified = fs.statSync(fullPath).mtime;

                    if (helpers.isObject(data)) {
                        data[json.name] = json;
                    } else {
                        data.push(json);
                    }
                } catch (e) {
                    logger.error(e);
                }
            });

        // Foreach of the folder...
        paths
            .filter(path => !path.includes('.'))
            .forEach(path => {
                if (typeof data[path] === 'undefined') {
                    data[path] = [];

                    findData(dir + '/' + path, data[path]);
                } else {
                    data[path].children = [];

                    findData(dir + '/' + path, data[path].children);
                }
            });

        return data;
    };

    var forEachPage = function(callback, obj?: Array<any>) {
        obj = obj || actualData;

        for (let key of Object.keys(actualData)) {
            let page = obj[key];

            callback(page);

            if (typeof page.children !== 'undefined' && page.children.length > 0) {
                forEachPage(callback, page.children);
            }
        }
    };

    var flatten = function() {
        let pages = [];

        forEachPage(page => {
            pages.push(page);
        });

        return pages;
    };

    var getPage = function(url) {
        return flatten()
            .find(page => page.path === url);
    };

    // Reloads the data if in dev mode, better for writing new posts!
    return function() {
        if (actualData === null || config.dev) {
            actualData = findData('data');
        }

        actualData.forEachPage = forEachPage;
        actualData.flatten = flatten;
        actualData.getPage = getPage;

        return actualData;
    };
}();

export default data;
