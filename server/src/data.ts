import marked = require('marked');
import fs = require('fs');

import Page from './interfaces/Page';

import config from './config'
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

class Data {
    private actualData: Array<Page> = null;
    constructor() {
        logger.info('data running');
    }
    get data() {
        if (this.actualData === null || config.dev) {
            this.actualData = this.findData('data');
        }

        return this.actualData;
    }
    /**
     * Reads a file.
     * Will return HTML, even if the original format is Markdown.
     * @param {string} path
     * @param {boolean} isAmp
     */
    private getContent(path: string, isAmp?: Boolean) {
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
    }
    private findData(dir: string, data?: Array<Page>) {
        data = data || [];
        let paths = fs.readdirSync(dir);

        // Foreach of the JSON files...
        paths
            .filter(path => path.includes('.json'))
            .forEach(path => {
                let fullPath = dir + '/' + path;

                try {
                    let stringPageContents = fs.readFileSync(fullPath, 'utf8');
                    let page: Page = JSON.parse(stringPageContents);

                    // If it's in dev mode, then the unpublished blog posts should show.
                    if (typeof page.published !== 'undefined' && !page.published && !config.dev) {
                        return;
                    }

                    if (typeof page.bodyText !== 'undefined') {
                        page.bodyText = this.getContent(page.bodyText);

                        //json.ampBodyText = getContent(page.bodyText, true);
                    }

                    // The lastmod tag is optional in sitmaps and in most of the cases it's ignored by search engines
                    // https://stackoverflow.com/a/31354426
                    //json.lastModified = fs.statSync(fullPath).mtime;

                    //let parentPage = data.find(p => p.name === page.name);

                    data.push(page);

                    /*
                        if (typeof parentPage !== 'undefined') {
                            parentPage.children.push(page);
                        } else {
                            data.push(page);
                        }
                    */
                } catch (e) {
                    logger.error(e);
                }
            });

        // Foreach of the folder...
        paths
            .filter(path => !path.includes('.'))
            .forEach(path => {
                let parentPage = data.find(p => p.name === path);

                if (typeof parentPage !== 'undefined') {
                    parentPage.children = [];

                    this.findData(dir + '/' + path, parentPage.children);
                } else {
                    logger.error(`Error adding page to data tree as it has no parent for path ${path}.`);
                }
            });

        return data;
    }
    public forEachPage(callback: Function, obj?: Array<Page>): void {
        obj = obj || this.actualData;

        for (let page of obj) {
            callback(page);

            if (typeof page.children !== 'undefined' && page.children.length > 0) {
                this.forEachPage(callback, page.children);
            }
        }
    }
    public flatten(): Array<Page> {
        let pages = [];

        this.forEachPage(page => {
            pages.push(page);
        });

        return pages;
    }
    public getPage(url: string): Page {
        return this.flatten()
            .find(page => page.path === url);
    }
}

export default new Data();
