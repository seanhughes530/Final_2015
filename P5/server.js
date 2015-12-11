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
      //console.log(data);

      var result = String(data[1]);

      if(result == 1){
        var strdata = String(data);
        var myData = strdata.substring(3,7) + " " + strdata.substring(7,11);

        var sdata = myData.split(" ");
        socket.emit('toScreen1', {p1x: sdata[0], p1y: sdata[1]})
        console.log(sdata);
      } else {
        var strdata = String(data);
        var myData = strdata.substring(3,7) + " " + strdata.substring(7,11);

        var sdata = myData.split(" ");
        socket.emit('toScreen2', {p2x: sdata[0], p2y: sdata[1]})
        console.log(sdata);
      }


      //result = data.split(',') // split data using "," as delimiter in to result array
      //result[3] // index 3 of results array
      //socket.emit('toScreen', { r: result[1], g: result[2], b: result[3] }); // emit with socket communication a javascript object named "toScreen" with contents key:value pairs for index [1],[2],[3] of result array   
    });
}
});
});



