var socket;
var url='192.168.1.139';
var port=8000

var p1horiz;
var p1vert;

var p2horiz;
var p2vert;

var back;

var c1X, c1Y, c2X, c2Y, cW, cH;
var m1X, m1Y, m2X, m2Y;

//class for collisions
var objective = [];
var obX, obY, obW, obH;


socket = io.connect(url+':'+port);
socket.on('toScreen', function (data) {
	p1horiz = float(data.p1x);
	p1vert = float(data.p1y);

	p2horiz = float(data.p2y);
	p2vert = float(data.p2x);
});




function setup(){
	createCanvas(1000,500);
	back = 0;

	c1X = 400;
	c1Y = 250;
	c2X = 600;
	c2Y = 250;
	
	cW = 20;
	cH = 20;

	////class stuff
	for (var i=0; i<6; i++) {
    	objective.push(new circle());
    	console.log("pushed");
  	}

}

function draw(){
	background(back);

	P1movement();
	P2movement();

	for (var i=0; i<6; i++) {
    	objective[i].display();
  	}

  	points();

}




function P1movement(){
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
		fill(255);
		ellipse(c1X, c1Y, cW, cH);	
}

function P2movement(){
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
		fill(255);
		ellipse(c2X, c2Y, cW, cH);
}


//objective circles
function circle(){

	obX = random(100,900);
	obY = random(50,450);
	obW = 60;
	obH = 60;

	console.log(obX);
	console.log(obY);

	this.display = function(){
		fill(0,0,255);
		ellipse(obX, obY, obW, obH);
	}
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
















