/*
 * @author Matt McFadyen (@mattmcfad)
 */

$(function(){
	app.init();
});


var app = {};

app.init = function(){

	app.regex = /[K-P][0-9][A-Z][0-9][A-Z][0-9]/;
	app.baseUrl = 'http://represent.opennorth.ca/';
	
	// Submit Button Event Handler
	$('#submitButton').on('click', function(e){
		e.preventDefault();

		// Input Postal Code
		var input = $('#ward').val();

		// Ensure all letters uppercased - API requirement
		input = input.toUpperCase();

		// Test if postal code is valid
		app.postalValidation(input);
	});

};

app.postalValidation = function(postalCode){

	if (app.regex.test(postalCode)){
		// run AJAX request
		app.ajaxRequest(postalCode,'postcodes/')
	}
	else{ // Invalid postal code
		console.log("invalid postal code");
		// Reset input
		$('#ward').val('');
	}

};

app.ajaxRequest = function(searchQuery, url){

	$.ajax({
		type: 'GET',
		url: app.baseUrl + url + searchQuery,
		dataType: 'jsonp',
		success: function(data){

			console.log(data);
		},
		error: function(err){
			alert('Error: Wrong Postal Code');
		}
	});
};

