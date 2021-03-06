//socket
var socket;
var url='192.168.1.18';
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
var f;  //color of objective circles
var distance1, distance2;

//bools for changing color
var color = false;

//bool for starting
var start = false;
//y coord for text
var tY;

var randomColors;
var done = false;




socket = io.connect(url+':'+port);
socket.on('toScreen1', function (data) {
	p1horiz = float(data.p1x);
	p1vert = float(data.p1y);

});

socket.on('toScreen2', function (data) {
	p2horiz = float(data.p2y);
	p2vert = float(data.p2x);

});








function setup(){
	createCanvas(windowWidth,windowHeight);
	back = 255;

	c1X = random(0,windowWidth/3);
	c1Y = random(windowHeight);
	c2X = random(2*windowWidth/3, windowWidth);
	c2Y = random(windowHeight);
	
	cW = 20;
	cH = 20;

	tY = windowHeight/3;

	f = (255);


	rR = random(0,255);
	rG = random(0,255);
	rB = random(0,255);
	randomColors = (rR,rG,rB);

	////class stuff
	for (var i=0; i<5; i++) {
    	objective.push(new circle());
    	//console.log("pushed");
  	}

}


function draw(){
	background(back);


	////////makes circles that you have to make contact with///////
	for (var i=0; i<5; i++) {
    	objective[i].display();
    	//console.log(objective[0].f);

    	if (objective[0].f == 177 && objective[1].f == 177 && objective[2].f == 177 && objective[3].f == 177 && objective[4].f == 177){
    		console.log("done!");
    		done = true;
    	}
  	}


  	/////starting prompt///////
	s = "Both players must make contact with each circle at the same time in order to make a connection. But remember, no talking allowed!";
	m = "[space to start]"
	fill(38,206,5);
	textAlign(CENTER);
	textSize(30);
	noStroke();
	text(s, windowWidth/4, tY, windowWidth/2, 100);
	text(m, windowWidth/4, tY + 150, windowWidth/2, 100);


	if (done){
		d = "Well Done!"
		fill(38,206,5);
		textAlign(CENTER);
		textSize(100);
		noStroke();
		text(d, windowWidth/4, windowHeight/3, windowWidth/2, 100);
	}  


  	///////collision,key pressed event, and color change/////////
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
		m1X = map(p1horiz,0,1021,5,-5.1811);
		m1Y = map(p1vert,0,1021,5,-5.1811);

		if ((m1X > -1) && (m1X < 0)){
			m1X = 0;
		} 
		if ((m1Y > -1) && (m1Y < 0)){
			m1Y = 0;
		}

		c1X += m1X;
		c1Y += m1Y;

	}	

	//color change 
	if(_color == true){
		fill(0);
	} else if (_color == false) {
		fill(0,255,255);
	}

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

	//color change	
	if(_color == true){
		fill(0);
	} else if (_color == false) {
		fill(255,0,255);
	}

	ellipse(c2X, c2Y, cW, cH);
}


//objective circles
function circle(){

	this.obX = random(0,windowWidth);
	this.obY = random(0,windowHeight);
	this.obW = 60;
	this.obH = 60;
	this.f = 255;

	this.display = function(){

		distance1 = dist(this.obX, this.obY, c1X, c1Y);
		distance2 = dist(this.obX, this.obY, c2X, c2Y);

		//points(distance1,distance2);

		//console.log(f);

		fill(this.f);
		stroke(0);
		ellipse(this.obX, this.obY, this.obW, this.obH);


		// console.log(distance1);
		// console.log(distance2);
		if((distance1 <= (this.obW/2)) && (distance2 <= (this.obW/2))){
			console.log("touch");

			this.f = 177;

			//return _f;
		}

	};

}


function colorChange(_color){
	var distance = dist(c1X, c1Y, c2X, c2Y);

	if(distance <= 100){
		color = true;
	} else {
		color = false;
	}
	return color;

}














