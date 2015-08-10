var serialport = require("serialport"),		// include the serialport library
	SerialPort  = serialport.SerialPort,	   // make a local instance of serial
	servi = require('servi'),		// include the servi library
	app = new servi(false);		// servi instance

// configure the server's behavior:
app.port(7070);						// port number to run the server on
app.serveFiles("public");			// serve all static HTML files from /public


// respond to web GET requests for the index.html page:
app.route('/', sendIndexPage);
app.route('/index*', sendIndexPage);
// take anything that begins with /output as a request:
app.route('/output/:value', sendToSerial);

// now that everything is configured, start the server:
app.start();	
console.log("Listening for new clients on port 7070");

 
// the third word of the command line command is serial port name:
var portName = process.argv[2];				  
// print out the port you're listening on:
console.log("opening serial port: " + portName);	

// open the serial port. Uses the command line parameter:
var myPort = new SerialPort(portName, { 
	baudRate: 57600,
	// look for return and newline at the end of each data packet:
	parser: serialport.parsers.readline("\r\n") 
});

/* The rest of the functions are event-driven. 
   They only get called when the server gets incoming GET requests:
*/

// this function responds to a GET request with the index page:
function sendIndexPage(request) {
  request.serveFile('/index.html');
}

function sendToSerial(request) {
  // get the parameters from the URL:
  var command = request.params.value
  console.log("received "+ "<"+command+">");

  // send it out the serial port:
  myPort.write('<'+command+'>\r\n');
  // send the data and close the connection:
  request.respond(command);
}
