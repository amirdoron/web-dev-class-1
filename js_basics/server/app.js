
console.log("hello world");

function InitServer()
{
	// load external libs
	var express = require('express');
	var bodyParser = require('body-parser');

	// construct an express object
	var app = express();

	// instruct the server to serve client's static files from ./client directory
	app.use(express.static(__dirname + '/../client'));
	app.use(bodyParser.json());

	// starting the server
	app.listen(8000);
	console.log("server listen on port 8000");

	return app;
}

var app = InitServer();

var personService = require('./personService.js');
var service = personService(app);