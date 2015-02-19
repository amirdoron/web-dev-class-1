console.log("load start person.js");

// attention: this function is defined in the global name space!
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

// attention: this object is defined in the global name space!
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

console.log("load end person.js");