#include <RFduinoGZLL.h>

device_t role = HOST;

String P1, P2, mydata;
String ind;
char myData1[7];
char myData2[7];

void setup() {

  Serial.begin(9600);
  RFduinoGZLL.begin(role);
  
}

void loop() {

}

void RFduinoGZLL_onReceive(device_t device, int rssi, char *data, int len){
  //Serial.println(data);
  ind = String(data[0]);
  
  if (ind == "A"){
    mydata = String(data);
    P1 = mydata.substring(1,15);

    Serial.print("Player1: ");
    Serial.println(P1);
  } else {
    Serial.print("Player2: ");
    Serial.println(data);
  }

  
}

