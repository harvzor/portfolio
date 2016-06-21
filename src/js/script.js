(function() {
	var body = document.getElementsByTagName('body')[0];
	var toggles = document.getElementsByClassName('toggle');
	var aside = document.getElementsByClassName('nav')[0];
	var footer = document.getElementById('footer');

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
})();

