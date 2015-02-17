
console.log("hello world");

// Alternative for the above.
// Class like example.
// A Person type that requires 3 parameters during creation
// This is a function (not a Person object yet).
// You'll need to use new Person(...) for creating a Person instance.
function Person(id, name, gender)
{
	// Person's data members
	this.mId = id;
	this.mName = name;
	this.mGender = gender;

	// Person's method
  this.ToString = function ()
  {
    return "Person ID " + this.mId + " Name " + this.mName + " Gender " + this.mGender;
  }
}

function CreatePersons()
{
	var persons =	[
			new Person(1, "person1", "Male"),
			new Person(2, "person2", "Female"),
			new Person(3, "person3", "Male")
	];

	return persons;
}

// Simulate PersonDAL object
var personDB = CreatePersons();

function InitServer()
{
	// load express external lib
	var express = require('express');

	// construct an express object
	var app = express();

	// define a REST route for getting a Person
	// to access this route you can call from web-browser to http://localhost:8000/person/get
	app.get('/person/get/:id', function (req, res)
	{
		// create a list of Persons with ID that match the requested id
		// consider moving such logic to an object that represents PersonDB e.g. PersonDAL
		var foundPersons = personDB.filter(function(p){
			return p.mId == req.params.id;
		});

		if(foundPersons[0] != null)
		{
			// use Person method
			console.log("sending " + foundPersons[0].ToString());

			// sending a javascript object is automatically serialized to a JSON
			res.send(foundPersons[0]);
		}
		else
		{
			res.send("Person " + req.params.id + " not found");
		}

	});

	// starting the server
	var server = app.listen(8000, function () {

		var host = server.address().address;
		var port = server.address().port;

		console.log('Example app listening at http://%s:%s', host, port);
	});
}

InitServer();

