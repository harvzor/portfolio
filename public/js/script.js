var body = document.getElementsByTagName('body')[0];
var toggles = document.getElementsByClassName('toggle');
var aside = document.getElementsByClassName('nav')[0];

for(var i = 0; i < toggles.length; i++) {
	toggles[i].addEventListener('click', function() {
		body.classList.toggle('nav-toggled');
	});
}

hljs.initHighlightingOnLoad();

