// Self executed anonymous function
// This is a function that is being executed once when the js module is loaded.
// It hides inside its internal stuff, and may expose subset interface to the outer javascript world.
// The code template for writing self exe anonymous function is as the following:
// (function()
// {
			// your code goes here
// })();

// parameters can be injected via the self exe anonymous function (see below).
// globalSpace == window
// Used as a alias, so in case window should be changed from some reason internal
// implementation remain intact.
(function(globalSpace)
{
	"use strict";

	console.log("load start person.js");

  // become private hence it defined inside the closure
	function getPersonById()
	{
		// JQuery $ function is know due to the fact it declared in global space i.e. under window
		var id = $('#personId').val();
		$.ajax({
			url: "/person/get/"+id,
			cache: false,
			success: function(person)
			{
				var personResult = "Person id " + person.Id +
					" name " + person.Name +
					" Gender " + person.Gender;

				$('#person-result').html(personResult);
			}
		});
	}

	// this one become private, hence it defined inside the closure
	var newPerson = {
		Id: 2211,
		Name: "Stark the king of the north",
		Gender: "Male"
	};

	$.ajax({
		url: '/person/add',
		type: 'post',
		data: JSON.stringify(newPerson),
		contentType: 'application/json',
		dataType: 'json'
	});

	// expose public API by injecting new object (PersonService) to the global namespace.
	var exportPersonService = {}; // define new object to contain the public API
	exportPersonService.GetById = getPersonById; // expose specific method
	globalSpace.PersonService = exportPersonService; // insert new namespace in the global one

	console.log("load end person.js");

})(window);// window is a global var that is injected into the closure