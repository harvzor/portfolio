var toggles = document.getElementsByClassName('toggle');
var aside = document.getElementsByClassName('nav')[0];

for(var i = 0; i < toggles.length; i++) {
	toggles[i].addEventListener('click', function() {
		aside.classList.toggle('toggled');
	});
}

