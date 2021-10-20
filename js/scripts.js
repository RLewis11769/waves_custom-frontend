$(document).ready(function () {

	// Execute background change every 5 seconds
	changeBG();
	setInterval(changeBG, 5000);

	// Use Slick carousel settings defined below for any single-item carousels
	$('.single').slick(singleCarousel);

	// Add validation and effect to form on "contact" page
	validate();
	inputEffect('input');
	inputEffect('textarea');
});


// Settings for Slick carousel
const singleCarousel = {
	autoplay: true,
	infinite: true,
	arrows: false,
	dots: true
}


// Global variables for changeBG function
const images = ['hero1', 'hero2', 'hero3'];
let classIndex = -1;

function changeBG() {
	// Change background image in hero section
	let hero = $('#hero');

	// If not first time in function, take off existing class
	if (classIndex >= 0) {
		hero.removeClass(images[classIndex]);
	}

	// Add next class from 0-2 based on existing class
	classIndex = (classIndex + 1) % images.length;
	hero.addClass(images[classIndex]);
}


function validate() {
	$('form').validate({
		// Add validation via jQuery Validate
		rules: {
			// Define rules to be validated for each "name" in form
			first: 'required',
			last: 'required',
			phone: {
				required: true,
				tel: true
			},
			email: {
				required: true,
				email: true
			},
		},
		// Specify validation error messages
		messages: {
			first: 'Please enter a valid contact name',
			last: 'Please enter a valid contact name',
			phone: 'Please enter a valid phone number',
			email: 'Please enter a valid email'
		},
		// Make sure the data in the form is submitted
		submitHandler: function (form) {
			form.submit();
		}
	});
}


function inputEffect (input) {
	// Add effect on form label via addition/removal of "active" class
	$(input).on('focusin', function () {
		// Whatever input is focused on, add class to label in that div
		$(this).parent().find('label').addClass('active');
	});

	$(input).on('focusout', function () {
		// If input has been clicked out of but no value has been input, remove class
		if (!input.value) {
			$(this).parent().find('label').removeClass('active');
		}
	});
}
