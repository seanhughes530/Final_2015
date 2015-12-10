//socket
var socket;
var url='192.168.1.125';
var port=8000

//incoming data 
var p1horiz;
var p1vert;

var p2horiz;
var p2vert;

//background
var back;

//coords of players 
var c1X, c1Y, c2X, c2Y, cW, cH;
var m1X, m1Y, m2X, m2Y;

//class for collisions
var objective = [];
var obX, obY, obW, obH;

//bools for changing color
var color = false;

//bool for starting
var start = false;
//y coord for text
var tY;


socket = io.connect(url+':'+port);
socket.on('toScreen', function (data) {
	p1horiz = float(data.p1x);
	p1vert = float(data.p1y);

	p2horiz = float(data.p2y);
	p2vert = float(data.p2x);
});




function setup(){
	createCanvas(windowWidth,windowHeight);
	back = 255;

	c1X = windowWidth/3;
	c1Y = windowHeight/2;
	c2X = 2*windowWidth/3;
	c2Y = windowHeight/2;
	
	cW = 20;
	cH = 20;

	tY = windowHeight/3;

	////class stuff
	for (var i=0; i<6; i++) {
    	objective.push(new circle());
    	//console.log("pushed");
  	}

}

function draw(){
	background(back);


	////////makes circles that you have to make contact with///////
	for (var i=0; i<6; i++) {
    	objective[i].display();
  	}


  	/////starting prompt///////
	s = "Both players must make contact at the same time with each empty circle in order to make a connection. But remember, no talking allowed!";
	fill(177,177,177);
	textAlign(CENTER);
	textSize(30);
	text(s, windowWidth/4, tY, windowWidth/2, 100); 


  	///////collision,key pressed event, and color change/////////
  	points();
  	keyReleased();

  	colorChange(color);

  	///////waits for space bar to be hit to begin game/////////
	if (start){
		P1movement(color);
		P2movement(color);
	}

}


function keyReleased(){
	if(keyCode === 32){
		start = true;
		tY = 11000;

	}
}


function P1movement(_color){
	if(isNaN(p1horiz)){
	}else{
		m1X = map(p1horiz,0,1021,10,-10.1811);
		m1Y = map(p1vert,0,1021,10,-10.1811);

		if ((m1X > -1) && (m1X < 0)){
			m1X = 0;
		} 
		if ((m1Y > -1) && (m1Y < 0)){
			m1Y = 0;
		}

		c1X += m1X;
		c1Y += m1Y;



	}	

	console.log(_color);
	//color change 
	if(_color == true){
		fill(0);
	} else if (_color == false) {
		fill(0,255,255);
	}
	//fill(0,255,255);

	noStroke();
	ellipse(c1X, c1Y, cW, cH);	
}

function P2movement(_color){
	if(isNaN(p2horiz)){
	}else{
		m2X = map(p2vert,0,1021,10,-10.1811);
		m2Y = map(p2horiz,0,1021,10,-10.1811);

		if ((m2X > -1) && (m2X < 0)){
			m2X = 0;
		} 
		if ((m2Y > -1) && (m2Y < 0)){
			m2Y = 0;
		}

		c2X += m2X;
		c2Y += m2Y;



	}

	// console.log(c2X);
	// console.log(m2X);
	// console.log(c2Y);
	// console.log(m2Y);

	//color change	
	if(_color == true){
		fill(0);
	} else if (_color == false) {
		fill(255,0,255);
	}
	//fill(255,0,255);

	ellipse(c2X, c2Y, cW, cH);
}


//objective circles
function circle(){

	obX = random(0,windowWidth);
	obY = random(0,windowHeight);
	obW = 60;
	obH = 60;

	console.log(obX);
	console.log(obY);

	this.display = function(){
		fill(255);
		stroke(0);
		ellipse(obX, obY, obW, obH);
	};
}


//collision
function points(){
	if ( (c1X >= (obX-(obW/2))) && (c1X <= (obX+(obW/2))) ){  //player1 x-val inside obj x-val 
		if ( (c2X >= (obX-(obW/2))) && (c2X <= (obX+(obW/2))) ){  //player2 x-val inside obj x-val
			if ( (c1Y >= (obY-(obH/2))) && (c1Y <= (obY+(obH/2))) ){  //player 1 y-val inside obj y-val
				if ( (c1Y >= (obY-(obH/2))) && (c1Y <= (obY+(obH/2))) ){  //player 2 y-val inside obj y-val
					console.log("touch");
				}
			}
		}
	}
}


function colorChange(_color){
	if( (c1X >= (c2X - 150)) && (c1X <= (c2X + 150))){
		if( (c1Y >= (c2Y - 150)) && (c1Y <= (c2Y + 150))){
			color = true;
		}
	} else{
		color = false;
	}
	return color;
}














