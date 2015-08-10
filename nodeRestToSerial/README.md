restToSerial.js

send messages to an Arduino and show an iframe with an mjpeg stream

To install it:
* make sure you've installed node.js
* from the command line,change directories to the directory where you downloaded the project

Enter the following:

	npm install 

You should end up with a new directory called node_modules, which will include socket.io, node-serialport, and servi.

To run it, enter:

	node index.js COM5 
	
Where portname is the name of your serial port. on linux it will be something like /dev/ttyUSB0

more info:
igoe node examples -  https://github.com/tigoe/NodeExamples and using jQuary
a good overview and example - https://itp.nyu.edu/physcomp/labs/labs-serial-communication/lab-serial-communication-with-node-js/
