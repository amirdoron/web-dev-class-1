// expose module as a object
// User should instantiate with a parameter (similar to ctor)
module.exports = function(listenOnPort)
{
	// Load the http module to create an http server.
	var http = require('http');

	return {
		// expose public method createServer
		// caller should provide the string that shall be returned in each http request
		createServer: function(respondMessage)
		{
			var server = http.createServer(function (request, response)
			{
				response.writeHead(200, {"Content-Type": "text/plain"});
				response.end(respondMessage+"\n");
			});

			// Listen on port that provided by the caller,
			// IP defaults to 127.0.0.1
			server.listen(listenOnPort);

			// Put a friendly message on the terminal
			console.log("Server running at http://127.0.0.1:"+ listenOnPort + "/");
		}
	};
}