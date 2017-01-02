var hw = {};

hw.youtubeVideoSetup = function() {
	var videos = document.getElementsByClassName('youtube-video');

	for (var i = 0; i < videos.length; i++) {
		videos[i].addEventListener('click', function(e) {
			var video = this;

			e.preventDefault();

			var iframe = document.createElement('iframe');

			iframe.setAttribute('src', video.getAttribute('href') + '?autoplay=1');
			iframe.setAttribute('height', '300');
			iframe.setAttribute('frameborder', '0');
			iframe.setAttribute('allowfullscreen', '');

			video.parentNode.replaceChild(iframe, video);
		});
	}
};

(function() {
	var body = document.getElementsByTagName('body')[0];
	var toggles = document.getElementsByClassName('toggle');
	var aside = document.getElementsByClassName('nav')[0];
	var footer = document.getElementById('footer');
	var content = document.getElementById('content');

	for (var i = 0; i < toggles.length; i++) {
		toggles[i].addEventListener('click', function(event) {
			body.classList.toggle('nav-toggled');
			event.preventDefault();
		});
	}

	hljs.initHighlightingOnLoad();

	if (window.innerWidth < 1024) {
		new Menu(body, {
			toggledClassName: 'nav-toggled'
		});
	}

	var aElements = document.getElementsByTagName('a');

	for (var i = 0; i < aElements.length; i++) {
		aElements[i].addEventListener('click', function(e) {
			var link = this;

			if (link.href.indexOf('#') > -1 || link.target == '_blank') {
				return;
			}

			e.preventDefault();

			content.classList.add('exiting');

			setTimeout(function() {
				window.location.href = link.href;
			}, 300);
		});
	}

	hw.youtubeVideoSetup();

	window.onbeforeunload = function(event) { 
		content.classList.add('exiting');
	}
})();

