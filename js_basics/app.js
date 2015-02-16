
console.log("hello world")

// load external module based on location
var HttpServer = require('./webService.js')

// construct the module with a parameter
var myServer = HttpServer(8000)

// call module's public method
myServer.createServer("hello sharky")