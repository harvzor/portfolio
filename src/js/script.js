var hw = {};

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

// Delay loading of next page so an exiting animation can be played.
hw.exitingAnimation = function() {
    var aElements = document.getElementsByTagName('a');
    var body = document.getElementsByTagName('body')[0];

    for (var i = 0; i < aElements.length; i++) {
        aElements[i].addEventListener('click', function(e) {
            var link = this;

            if (link.href.indexOf('#') > -1 || link.target == '_blank') {
                return;
            }

            e.preventDefault();

            body.classList.add('exiting');

            setTimeout(function() {
                window.location.href = link.href;
            }, 50);
        });
    }

    window.onbeforeunload = function(event) {
        body.classList.add('exiting');
    }
};

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

// https://gomakethings.com/how-to-test-if-an-element-is-in-the-viewport-with-vanilla-javascript/
hw.isInViewport = function (elem) {
    var bounding = elem.getBoundingClientRect();

    return (
        bounding.top >= 0 &&
        bounding.left >= 0 &&
        bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        bounding.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
};

/**
 * Only load the Disqus comments if the user can see where the comments should be.
*/
hw.disqus = function() {
    var disqusElement = document.getElementById('disqus_thread');
    var loaded = false;

    if (!disqusElement) {
        return;
    }

    var run = function() {
        var disqus_shortname = 'portfoliodisqus';
        var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
        dsq.src = '//' + disqus_shortname + '.disqus.com/embed.js';
        (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
    };

    var scrollEvent = function() {
        if (!loaded && hw.isInViewport(disqusElement)) {
            loaded = true;

            run();

            window.removeEventListener('scroll', scrollEvent);
        }
    };

    window.addEventListener('scroll', scrollEvent);
};

(function() {
    hw.nav();
    hljs.initHighlightingOnLoad();
    hw.youtubeVideoSetup();
    hw.exitingAnimation();
    hw.disqus();
})();
