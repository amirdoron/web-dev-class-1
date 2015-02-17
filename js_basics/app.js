
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

// load express external lib
var express = require('express');

// construct an express object
var app = express();

// define a REST route for getting a Person
// to access this route you can call from web-browser to http://localhost:8000
app.get('/', function (req, res)
{
	// instantiate a Person object
	var rogerRabitPerson = new Person(1234, "Roger Rabit", "Male");

	// use Person method
	console.log("sending " + rogerRabitPerson.ToString());

	// sending a javascript object is automatically serialized to a JSON
	res.send(rogerRabitPerson);
});

// starting the server
var server = app.listen(8000, function () {

	var host = server.address().address;
	var port = server.address().port;

	console.log('Example app listening at http://%s:%s', host, port);
});