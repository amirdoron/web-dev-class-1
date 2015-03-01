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
				displayPersons(persons, "person-list");
			}
		})
	}

	function displayPersons(persons, htmlTagId)
	{
		var data = {nodes:[],links:[]};
		persons.forEach(function(p)
		{
			// fill persons in nodes array
			data.nodes.push({id: p.Id, "loaded":true, "style": {"label": p.Name}});
			// note that not all persons have links to others
			// so do the following only to persons which have ..
			if(p.LinksTo != null)
			{
				// linkage between this persons to others according to person's links to others array
				p.LinksTo.forEach(function(link)
				{
					data.links.push({id: p.Id + "_to_"+link, from: p.Id, to: link});
				});
			}
		});

		var t = new NetChart({
			container: document.getElementById(htmlTagId),
			height: 600,
			data:
			{
				preloaded: data
			}
		});
	}

	//var gridster = $(".gridster > ul").gridster({
	//	widget_margins: [5, 5],
	//	widget_base_dimensions: [100, 55]
	//}).data('gridster');
	//
	//var widgets = [
	//	['<li>0</li>', 1, 2],
	//	['<li>1</li>', 3, 2],
	//	['<li>2</li>', 3, 2],
	//	['<li>3</li>', 2, 1],
	//	['<li>4</li>', 4, 1],
	//	['<li>5</li>', 1, 2],
	//	['<li>6</li>', 2, 1],
	//	['<li>7</li>', 3, 2],
	//	['<li>8</li>', 1, 1],
	//	['<li>9</li>', 2, 2],
	//	['<li>10</li>', 1, 3]
	//];
	//
	//$.each(widgets, function(i, widget){
	//	gridster.add_widget.apply(gridster, widget)
	//});


	var newPerson = {
		Id: 2211,
		Name: "Stark the king of the north",
		Gender: "Male",
		LinksTo: [1,2,3]
	};

	$.ajax({
		url: '/person/add',
		type: 'post',
		data: JSON.stringify(newPerson),
		contentType: 'application/json',
		dataType: 'json'
	});

})(window, ObjectDm, jQuery);
