#include <RFduinoGZLL.h>

device_t role = DEVICE2;

const int vert = 2;  //analog x-plane
const int horiz = 4;  //analog y-plane
const int sel = 6;  //dig button


void setup() {

  pinMode(sel,INPUT);
  digitalWrite(sel,HIGH);

  Serial.begin(9600);

  RFduinoGZLL.txPowerLevel = 0;
  RFduinoGZLL.begin(role);
}

void loop() {
  int x, y, but;
  int Ps;
  
  String xstr;
  String ystr;
  String sstr;
  String mydata;


  ///////////read data///////////////////
  ////////////////////////////////////////
  y = analogRead(vert);
  x = analogRead(horiz);
  but = digitalRead(sel);
  
  //////up and down////////
  
//  if(y >= 1000){
//    Py == 2;  //UP
//  } else if(y <= 10){
//    Py == 1;  //DOWN
//  } else {
//    Py == 0;
//  }

  if (y >= 1000)
  {
    ystr = String(y);
  }
  else if (y < 1000 && y >= 100) {
    ystr = String(0) + String(y);
  }
  else if (y < 100 && y >=10) {
    ystr = String(0) + String(0) + String(y);
  }
  else if (y < 10) {
    ystr = String(0) + String(0) + String(0) + String(y);
  }
 
//  Serial.print("Y: ");
//  Serial.println(ystr);

  ///////left and right/////////
  
//  if(x >= 1000){
//    Px == 2;  //LEFT
//  } else if(x <= 10){
//    Px == 1;  //RIGHT
//  } else {
//    Px == 0;
//  }

  if (x >= 1000)
  {
    xstr = String(x);
  }
  else if (x < 1000 && x >= 100) {
    xstr = String(0) + String(x);
  }
  else if (x < 100 && x >=10) {
    xstr = String(0) + String(0) + String(x);
  }
  else if (x < 10) {
    xstr = String(0) + String(0) + String(0) + String(x);
  }
  
//  Serial.print("X: ");
//  Serial.println(xstr);

  ////////select////////////
  if(but == HIGH){
    Ps == 1;
  } else {
    Ps == 0;
  }
  sstr = String (Ps);

  ////////////////////send data//////////////////
  ///////////////////////////////////////////////
  char xdata[5];
  char ydata[5];
  char sdata[5];
  char data[15];

  mydata = xstr+ystr+sstr;
  mydata.toCharArray(data,15);

  Serial.println(data);

  RFduinoGZLL.sendToHost(data,15);
  delay(100);

}
