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

			e.preventDefault();

			content.classList.add('exiting');

			setTimeout(function() {
				window.location.href = link.href;
			}, 300);
		});
	}

	window.onbeforeunload = function(event) { 
		content.classList.add('exiting');
	}
})();

