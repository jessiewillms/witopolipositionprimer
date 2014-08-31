/*
 * @author Matt McFadyen (@mattmcfad)
 */

$(function(){
	app.init();
});

var app = {};

// Initialize the app
app.init = function(){

	// Regex used for validating its in a Postal Code format
	// and that first letter belongs to Ontario,
	app.regex = /[K-P][0-9][A-Z][0-9][A-Z][0-9]/;

	// API base url for AJAX requests
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

// Validate PostalCode inputted using Regex
app.postalValidation = function(postalCode){

	// If postal code passes regex test
	if (app.regex.test(postalCode)){
		// then run AJAX request
		app.ajaxRequest(postalCode,'postcodes/')
	}
	else{ // Else Invalid postal code
		alert("Invalid Postal Code!!!");
		// Reset input
		$('#ward').val('');
	}

};

// Make AJAX request to API
app.ajaxRequest = function(searchQuery, url){

	$.ajax({
		type: 'GET',
		timeout: 500, // ensure callback function runs on error
		url: app.baseUrl + url + searchQuery,
		dataType: 'jsonp',
		success: function(data){
			// Successful AJAX request
			app.handleData(data);

			// clear input field after successful search
			$('#ward').val('')
		},
		error: function(jqXHR, textStatus, errorThrown){
			// Error, could not find postal code
			alert("Error! Please enter a valid postal code");
		},
	});
};

// Handle data retrieved from AJAX request and passed as parameter
app.handleData = function(data){

	// L1H 7K4 (Oshawa)  Non-Toronto Postal Code
	// M5S 2M7 (Trinity - Spadina) : 20
	// M5B 2C7 (Toronto Centre - Rosedale) : 27
	// M9A 2J7 (Etobicoke Center) : 4
	// L4H 1J1 (Woodbridge West) : 2

	console.log(data);

	// Not a Toronto Postal Code
	if(data.boundaries_centroid.length !== 4){
			alert('Error: Not a Toronto Postal Code!!!');
	}
	else{ // Valid Toronto Postal Code

			var external_id = data.boundaries_centroid[3].external_id,
		      name = data.boundaries_centroid[3].name;

			alert('name: ' + name + ' external_id: ' + external_id);
	}

}
