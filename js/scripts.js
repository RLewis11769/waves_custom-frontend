$(document).ready(function () {
	const images = ['hero1', 'hero2', 'hero3'];
	let classIndex = -1;

	function changeBG() {
		let hero = $('#hero');

		if (classIndex >= 0) {
			hero.removeClass(images[classIndex]);
		}

		classIndex = (classIndex + 1) % images.length;
		hero.addClass(images[classIndex]);
	}

	changeBG();
	setInterval(changeBG, 5000);

});


