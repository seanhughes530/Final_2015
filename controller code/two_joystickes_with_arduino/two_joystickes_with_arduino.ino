//joystick 1
const int VERT = 0; // analog
const int HORIZ = 1; // analog
const int SEL = 2; // digital

//joystick 2
const int VERT2 = 2; // analog
const int HORIZ2 = 3; // analog
const int SEL2 = 3; // digital

void setup(){
  //first
  pinMode(SEL,INPUT);
  digitalWrite(SEL,HIGH);
  //second
  pinMode(SEL2,INPUT);
  digitalWrite(SEL2,HIGH);

  Serial.begin(9600);
}

void loop() {
  int vertical, horizontal, select;
  int vertical2, horizontal2, select2;
  
  // read all values from the joystick 1 
  vertical = analogRead(VERT); // will be 0-1023
  horizontal = analogRead(HORIZ); // will be 0-1023
  select = digitalRead(SEL); // will be HIGH (1) if not pressed, and LOW (0) if pressed

  // read all values from the joystick 2 
  vertical2 = analogRead(VERT2); // will be 0-1023
  horizontal2 = analogRead(HORIZ2); // will be 0-1023
  select2 = digitalRead(SEL2); // will be HIGH (1) if not pressed, and LOW (0) if pressed
  
  
  // print out the values for joystick 1
  Serial.print("Joystick 1:  ");
  Serial.print("vertical: ");
  if(vertical >= 1000){
    Serial.print("UP!");
  } else if(vertical <= 10){
    Serial.print("DOWN!");
  }
  //Serial.print(vertical,DEC);
  Serial.print(" horizontal: ");
  if(horizontal >= 1000){
    Serial.print("LEFT!");
  } else if(horizontal <= 10){
    Serial.print("RIGHT!");
  }
  //Serial.print(horizontal,DEC);
  Serial.print(" select: ");
  if(select == HIGH)
    Serial.println("not pressed");
  else
    Serial.println("PRESSED!");
  

  // print out the values for joystick 2
  Serial.print("Joystick 2:  ");
  Serial.print("vertical: ");
  if(vertical2 >= 1000){
    Serial.print("UP!");
  } else if(vertical2 <= 10){
    Serial.print("DOWN!");
  }
  //Serial.print(vertical2,DEC);
  Serial.print(" horizontal: ");
  if(horizontal2 >= 1000){
    Serial.print("LEFT!");
  } else if(horizontal2 <= 10){
    Serial.print("RIGHT!");
  }
  //Serial.print(horizontal2,DEC);
  Serial.print(" select: ");
  if(select2 == HIGH)
    Serial.println("not pressed");
  else
    Serial.println("PRESSED!");

  delay(1000);
}  
