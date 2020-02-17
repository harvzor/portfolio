var hw = {};

hw.helpers = {
    // https://gomakethings.com/how-to-test-if-an-element-is-in-the-viewport-with-vanilla-javascript/
    isInViewport: function(elem) {
        var bounding = elem.getBoundingClientRect();

        return (
            bounding.top >= 0 &&
            bounding.left >= 0 &&
            bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            bounding.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    },
    injectCssFileReference: function(href) {
        var link = document.createElement('link');

        link.href = href;
        link.rel = 'stylesheet';

        document.getElementsByTagName('head')[0].appendChild(link);
    },
    injectJsFileReference: function(src, callback) {
        var script = document.createElement('script');

        script.type = 'text/javascript';
        script.async = true;
        script.src = src;

        if (typeof callback !== 'undefined') {
            // https://stackoverflow.com/questions/16839698/jquery-getscript-alternative-in-native-javascript
            script.onload = script.onreadystatechange = function( _, isAbort ) {
                if(isAbort || !script.readyState || /loaded|complete/.test(script.readyState) ) {
                    script.onload = script.onreadystatechange = null;
                    script = undefined;

                    if(!isAbort) { if(callback) callback(); }
                }
            };
        }

        (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(script);
    }
};

hw.youtubeVideoSetup = function() {
    var testImage = function(src, callback) {
        var image = new Image();

        image.src = src;

        image.onload = function() {
            if (image.width === 120) {
                callback();
            }
        };
    };

    var videos = document.getElementsByClassName('youtube-video');

    for (var i = 0; i < videos.length; i++) {
        var imageSrc = videos[i].style['background-image']
            .slice(4, -1).replace(/"/g, "");

        (function() {
            var videoIndex = i;

            // Some of the videos don't load the max resolution images (for some reason).
            // This is a fallback to make sure those videos will at least load the high quality image.
            testImage(imageSrc, function() {
                videos[videoIndex].style['background-image'] = 'url("https://img.youtube.com/vi/' + videos[videoIndex].getAttribute('data-id') + '/hqdefault.jpg")';
            });
        })()

        videos[i].addEventListener('click', function(e) {
            var video = this;

            e.preventDefault();

            var iframe = document.createElement('iframe');

            iframe.setAttribute('src', video.getAttribute('href') + '?autoplay=1');
            iframe.setAttribute('height', video.clientHeight);
            iframe.setAttribute('frameborder', '0');
            iframe.setAttribute('allowfullscreen', '');

            video.parentNode.replaceChild(iframe, video);
        });
    }
};

/**
 * Delay loading of next page so an exiting animation can be played.
 */
hw.exitingAnimation = function() {
    var aElements = document.getElementsByTagName('a');
    var body = document.getElementsByTagName('body')[0];

    var clickEvent = function(e) {
        var link = this;

        if (link.href.indexOf('#') > -1 || link.target == '_blank') {
            return;
        }

        e.preventDefault();

        body.classList.add('exiting');

        setTimeout(function() {
            window.location.href = link.href;
        }, 50);
    };

    // There's some kind of bug on mobile where the exiting class remains if you navigate backwards.
    // Perhaps this will solve it?
    if (body.offsetWidth > 1023) {
        for (var i = 0; i < aElements.length; i++) {
            aElements[i].addEventListener('click', clickEvent);
        }
    }

    window.onbeforeunload = function() {
        body.classList.add('exiting');
    }
};

/**
 * Allow nav to be opened.
 */
hw.nav = function() {
    var body = document.getElementsByTagName('body')[0];
    var toggles = document.getElementsByClassName('toggle');

    var clickEvent = function(e) {
        e.preventDefault();

        body.classList.toggle('nav-toggled');
    };

    for (var i = 0; i < toggles.length; i++) {
        toggles[i].addEventListener('click', clickEvent);
    }
};

/**
 * Only load the Disqus comments if the user can see where the comments should be.
*/
hw.disqus = function() {
    var disqus_shortname = 'portfoliodisqus';
    var disqusElement = document.getElementById('disqus_thread');
    var loaded = false;

    if (!disqusElement) {
        return;
    }

    var scrollEvent = function() {
        if (!loaded && hw.helpers.isInViewport(disqusElement)) {
            loaded = true;

            hw.helpers.injectJsFileReference('//' + disqus_shortname + '.disqus.com/embed.js');

            window.removeEventListener('scroll', scrollEvent);
        }
    };

    window.addEventListener('scroll', scrollEvent);
};

hw.codeHighlighting = function() {
    if (document.querySelectorAll('pre code').length < 1) {
        return;
    }

    hw.helpers.injectCssFileReference('//cdnjs.cloudflare.com/ajax/libs/highlight.js/8.5/styles/github.min.css');
    hw.helpers.injectJsFileReference('//cdnjs.cloudflare.com/ajax/libs/highlight.js/8.5/highlight.min.js', function() {
        hljs.initHighlightingOnLoad();
    });
};

(function() {
    hw.nav();
    hw.youtubeVideoSetup();
    hw.exitingAnimation();
    hw.codeHighlighting();
    hw.disqus();
})();
