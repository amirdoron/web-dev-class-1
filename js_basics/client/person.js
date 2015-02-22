(function(globalSpace, ObjectDm, $) // ObjectDm is know become an external dependency
{
	"use strict";

	var exportPersonService = {};
	globalSpace.PersonService = exportPersonService;

	var personDm = new ObjectDm( "person" );
	personDm.set("id", 1);

	exportPersonService.GetById = function()
	{
		var id = personDm.get("id");

		$.ajax({
			url: "/person/get/"+id,
			cache: false,
			success: function(person)
			{
				var personResult = "Person id " + person.Id +
					" name " + person.Name +
					" Gender " + person.Gender;

				personDm.set( "result", personResult ); // where result represents person's data result
			}
		});
	}

	exportPersonService.GetAll = function()
	{
		$.ajax({
			url: "/person/get",
			cache: false,
			success: function(persons)
			{
				displayPersons(persons, $("#person-list"));
			}
		})
	}

	function displayPersons(persons, htmlTag)
	{
		persons.forEach(function(p)
		{
			$(htmlTag).append("<div>" +
												"ID " + p.Id +
												" Name " + p.Name +
												" Gender " + p.Gender +
												"</div>");
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

})(window, ObjectDm, jQuery);
