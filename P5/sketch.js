var socket;
var url='192.168.1.9';
var port=8000

socket = io.connect(url+':'+port);
socket.on('toScreen', function (data) {

});