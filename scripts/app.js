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
		timeout: 500, // ensure callback function runs on error
		url: app.baseUrl + url + searchQuery,
		dataType: 'jsonp',
		success: function(data){

			if(data.error){console.log("error:"+data.error);}

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

app.handleData = function(data){

	var external_id = data.boundaries_centroid[2].external_id;
	var name = data.boundaries_centroid[2].name;

	console.log('name: '+ name);
	console.log('external_id: ' + external_id);
}

