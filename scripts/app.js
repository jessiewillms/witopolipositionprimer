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
		console.log("invalid postal code");
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

	// Need to determine index on boundaries_centroid array,
	// Hardcoded to 2 for Toronto wards

	var external_id = data.boundaries_centroid[2].external_id;
	var name = data.boundaries_centroid[2].name;

	console.log('name: '+ name);
	console.log('external_id: ' + external_id);
	alert('name: ' + name + ' external_id: ' + external_id);

}

