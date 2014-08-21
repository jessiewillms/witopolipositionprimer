/*
 * @author Matt McFadyen (@mattmcfad)
 */

$(function(){
	app.init();
});


var app = {};

app.init = function(){

	app.regex = /[K-P][0-9][A-Z][0-9][A-Z][0-9]/;
	
	// Submit Button Event Handler
	$('#submitButton').on('click', function(e){
		e.preventDefault();

		// Input Postal Code
		var input = $('#ward').val();

		// Ensure all letters uppercased
		input = input.toUpperCase();

		// Test if postal code is valid
		app.postalValidation(input);

		
	});

};

app.postalValidation = function(postalCode){

	console.log(postalCode);
};

