var bodyParser = require('body-parser');
var express = require("express");
var serialport = require("serialport");
var app = express();
var port = 8000;
var url='localhost'
var server = app.listen(port);
var io = require("socket.io").listen(server);
var SerialPort = serialport.SerialPort; 
var port = new SerialPort("/dev/ttyAMA0", {
  baudrate: 9600,
  parser: serialport.parsers.readline("\n")
}, false); 

app.use(express.static(__dirname + '')); 
console.log('Simple static server listening at '+url+':'+port);


io.sockets.on('connection', function (socket) {

socket.on('toSerial', function (data) {
    console.log(data); 
  });



port.open(function(error) { 
  if (error) {
    console.log('failed to open: ' + error);
  } else { 
    console.log('Serial open'); 
    port.on('data', function(data) { 
      console.log(data);
      //result = data.split(',') // split data using "," as delimiter in to result array
      result[3] // index 3 of results array
      socket.emit('toScreen', { r: result[1], g: result[2], b: result[3] }); // emit with socket communication a javascript object named "toScreen" with contents key:value pairs for index [1],[2],[3] of result array   
    });
}
});
});



