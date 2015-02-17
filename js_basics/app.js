
console.log("hello world");

function InitServer()
{
	// load express external lib
	var express = require('express');

	// construct an express object
	var app = express();

	// starting the server
	var server = app.listen(8000, function () {

		var host = server.address().address;
		var port = server.address().port;

		console.log('Example app listening at http://%s:%s', host, port);
	});

	return app;
}

var app = InitServer();
var personService = require('./personService.js');
var service = personService(app);