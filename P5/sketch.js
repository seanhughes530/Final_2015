var socket;
var url='192.168.1.138';
var port=8000

var p1horiz;
var p1vert;

var p2horiz;
var p2vert;

socket = io.connect(url+':'+port);
socket.on('toScreen', function (data) {
	p1horiz = data.p1x;
	p1vert = data.p1y;

	p2horiz = data.p2y;
	p2vert = data.p2x;
});


var back;

var c1X, c1Y, c2X, c2Y, cW, cH;
var m1X, m1Y, m2X, m2Y;

function setup(){
	createCanvas(1000,500);
	back=0;

	c1X = 400;
	c1Y = 250;
	c2X = 600;
	c2Y = 250;
	
	cW = 20;
	cH = 20;
}

function draw(){
	background(back);

	P1movement();
	P2movement();
}

function P1movement(){
	//mX = map(p1horiz,0,1021,-10,10);

	m1X = map(p1horiz,0,1021,width,0);
	m1Y = map(p1vert,0,1021,height,0);

	c1X = m1X;
	c1Y = m1Y;

	fill(255);
	ellipse(c1X, c1Y, cW, cH);		
}

function P2movement(){
	//mX = map(p1horiz,0,1021,-10,10);

	m2X = map(p2horiz,0,1021,width,0);
	m2Y = map(p2vert,0,1021,0,height);

	c2X = m2X;
	c2Y = m2Y;

	fill(255);
	ellipse(c2X, c2Y, cW, cH);		
}



