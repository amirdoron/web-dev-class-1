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

		var data = {
			"nodes":[
				{"id":"n1", "loaded":true, "style":{"label":"Node1"}},
				{"id":"n2", "loaded":true, "style":{"label":"Node2"}},
				{"id":"n3", "loaded":true, "style":{"label":"Node3"}}
			],
			"links":[
				{"id":"l1","from":"n1", "to":"n2", "style":{"fillColor":"red", "toDecoration":"arrow"}},
				{"id":"l2","from":"n2", "to":"n3", "style":{"fillColor":"green", "toDecoration":"arrow"}},
				{"id":"l3","from":"n3", "to":"n1", "style":{"fillColor":"blue", "toDecoration":"arrow"}}
			]
		};

		var t = new NetChart({
			container: document.getElementById("chartContainer"),
			height: 350,
			data:
			{
				preloaded: data
			}
		});
	}

	var gridster = $(".gridster > ul").gridster({
		widget_margins: [5, 5],
		widget_base_dimensions: [100, 55]
	}).data('gridster');

	var widgets = [
		['<li>0</li>', 1, 2],
		['<li>1</li>', 3, 2],
		['<li>2</li>', 3, 2],
		['<li>3</li>', 2, 1],
		['<li>4</li>', 4, 1],
		['<li>5</li>', 1, 2],
		['<li>6</li>', 2, 1],
		['<li>7</li>', 3, 2],
		['<li>8</li>', 1, 1],
		['<li>9</li>', 2, 2],
		['<li>10</li>', 1, 3]
	];

	$.each(widgets, function(i, widget){
		gridster.add_widget.apply(gridster, widget)
	});


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
