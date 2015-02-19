// Self executed anonymous function
// This is a function that is being executed once when the js module is loaded.
// It hides inside its internal stuff, and may expose subset interface to the outer javascript world.
// The code template for writing self exe anonymous function is as the following:
// (function()
// {
			// your code goes here
// })();

(function(globalSpace, ObjectDm) // ObjectDm is know become an external dependency
{
	"use strict";

	console.log("load start person.js");

	// create new person DM to bind between HTML view and this javascript controller
	var personDm = new ObjectDm( "person" );
	// set some initial value for the person ID (up to this point the default value was set on the HTML)
	personDm.set("id", 1);

	function getPersonById()
	{
		// To cancel direct dependency between this controller and HTML tag's ID defined in the view
		// to allow fetching the person ID, we can use MVC instead ...
		// so instead of doing: var id = $('#personId').val();
		// we can do:
		var id = personDm.get("id"); // where id represents the person's id property

		$.ajax({
			url: "/person/get/"+id,
			cache: false,
			success: function(person)
			{
				var personResult = "Person id " + person.Id +
					" name " + person.Name +
					" Gender " + person.Gender;

				// Set person data depends on specific HTML tag's ID
				// MVC pattern is also suitable for this case as well ...
				//so instead of doing: $('#person-result').html(personResult);
				// we can do:
				personDm.set( "result", personResult ); // where result represents person's data result
			}
		});
	}

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

})(window, ObjectDm);
