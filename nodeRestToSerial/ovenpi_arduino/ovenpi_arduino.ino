/* 
///////////////////////////////////////////////
//      Microwave Controller V_1 7/16/15      //
// Arkadi Rafalovich - Arkadiraf@gmail.com   //
///////////////////////////////////////////////

Setup:
Arduino uno (Redboard)
Arduino prototype shield + 2 Multiplexers 1x16 : CD74HC4067 +2 RJ45 (Ethernet, cables)
Arduino Xbee shield + RN42-XV Bluetooth module
Power adapter 9v or 6 AA batteries

Pinout:
0,1 : RX,TX - Xbee:
MicroWave wires 1-7 --> Ethernet cable --> Mux 1
Microwave wires 8-13 --> Ethernet cable --> Mux 2
Microwave GND --> Ethernet cable --> Common GND

Mux 1:
D4 - S0
D5 - S1
D6 - S2
D7 - S3
D12- EN

Mux 2:
D8 - S0
D9 - S1
D10- S2
D11- S3
D12- EN

Command Protocol:
<start>\r\n    Start micro
<stop>\r\n     Stop micro
<popcorn>\r\n  Stop, Popcorb, Start
<p10s>\r\n     Add 10 second to time, set time variable
<p30s>\r\n     +30s time

Microwave Wires to buttons:
See excel for details:
(Mux1,Mux2:)
Keys: 
0    - (5,14)
1    - (5,13)
2    - (5,12)
3    - (5,11)
4    - (5,100
5    - (5,9)
6    - (5,8)
7    - (4,14)
8    - (4,13)
9    - (4,12)
+30  - (4,9)
Start    - (4,10)
Stop     - (4,11)
Popcorn  - (2,14)
*/

///////////////
// Variables //
///////////////

//Mux2 control pins
int Mux2s0 = 4;
int Mux2s1 = 5;
int Mux2s2 = 6;
int Mux2s3 = 7;

//Mux1 control pins
int Mux1s0 = 8;
int Mux1s1 = 9;
int Mux1s2 = 10;
int Mux1s3 = 11;
//enable pin
int Mux_En=12;

int SetTime=0;
int SetSec=0;
int SetMinutes=0;
///////////////////////////
// Serial Input Command  //
///////////////////////////
// communication protocol is based on my own open source protocol implemented in other open source projects

String inputString = "                              ";         // a string to hold incoming data (30 chars length)
boolean stringComplete = false;  // whether the string is complete
int stringCMDStart=-1; // Command String Start
int stringCMDEnd=-1; // Command String Ends
int stringCMDValueStart=-1; // Command Value String Start
int stringCMDValueEnd=-1; // Command Value String Ends
// Split the inputString into Command and Value

String Command="                    "; // The Commands (20 chars length)
String CommandValueString="          "; // The Values (10 chars length)
char CommandValueChar[10]={"         "};
int CommandValue=0; // The Values in Int
///////////
// Setup //
///////////
void setup(){
  // Initialize serial communication, (Xbee/PC)
  Serial.begin(57600);
  
  // Mux Setup
  pinMode(Mux1s0, OUTPUT); 
  pinMode(Mux1s1, OUTPUT); 
  pinMode(Mux1s2, OUTPUT); 
  pinMode(Mux1s3, OUTPUT); 
  pinMode(Mux2s0, OUTPUT); 
  pinMode(Mux2s1, OUTPUT); 
  pinMode(Mux2s2, OUTPUT); 
  pinMode(Mux2s3, OUTPUT);
  pinMode(Mux_En, OUTPUT);  
  
  digitalWrite(Mux1s0, LOW);
  digitalWrite(Mux1s1, LOW);
  digitalWrite(Mux1s2, LOW);
  digitalWrite(Mux1s3, LOW);
  digitalWrite(Mux2s0, LOW);
  digitalWrite(Mux2s1, LOW);
  digitalWrite(Mux2s2, LOW);
  digitalWrite(Mux2s3, LOW);
  digitalWrite(Mux_En, HIGH); // disable MUX
  

}// end Setup


///////////////
// Main Code //
///////////////

void loop(){
  // If string is complete then parse string and execute the command.
  if (stringComplete) {
    ParseString();
    ExecuteCommand();
  }
}// end Main Code

///////////////////
///////////////////
//// Functions ////
///////////////////
///////////////////

/////////////////
// SerialEvent //
/////////////////
/*
  SerialEvent occurs whenever a new data comes in the
 hardware serial RX.  This routine is run between each
 time loop() runs.
*/
void serialEvent() {
  while (Serial.available()) {
    // get the new byte:
    char inChar = (char)Serial.read(); 
    // add it to the inputString:
    inputString += inChar;
    // if the incoming character is a newline, set a flag
    // so the main loop can do something about it:
    if (inChar == '\n') {
      stringComplete = true;
    } 
  }
} // end serial event

/////////////////////////////
// Parse Recieved Command  //
/////////////////////////////
void ParseString(void)
{
  stringCMDStart=inputString.indexOf('<');
  stringCMDEnd=inputString.indexOf('>',stringCMDStart+1);
  stringCMDValueStart=inputString.indexOf('<',stringCMDEnd+1);
  stringCMDValueEnd=inputString.indexOf('>',stringCMDValueStart+1);
  
  // seperate command and value
  if (stringCMDStart!=-1&&stringCMDEnd!=-1){
    Command=inputString.substring(stringCMDStart+1,stringCMDEnd);
    if (stringCMDValueStart!=-1&&stringCMDValueEnd!=-1){
      CommandValueString=inputString.substring(stringCMDValueStart+1,stringCMDValueEnd);
      CommandValueString.toCharArray(CommandValueChar, 10);
      CommandValue=atoi(CommandValueChar);
    }else{
//      Serial.println("Invalid Value");
      CommandValueString="Inv Val";
      CommandValue=-1;
    }
  }else{
//    Serial.println("Invalid CMD");
    Command="Inv CMD";
  }
  
//  // Print Command and Value
//  Serial.print(Command);
//  Serial.print("   ");
//  Serial.print(CommandValueString);
//  
//  Serial.print("   ");
//  Serial.println(CommandValue);
  
  // clear the string and restart status:
  inputString = "";
  stringComplete = false;  
}// end parse string


/////////////////////////////
// Execute Recieved Command//
/////////////////////////////

void ExecuteCommand(void)
{
  if (Command.equalsIgnoreCase("Stop")){
    SetTime=0; // clear set time
    WiresConnect(4,11);
  }else if(Command.equalsIgnoreCase("Start")){
    WiresConnect(4,10);
  }else if(Command.equalsIgnoreCase("p30s")){
    WiresConnect(4,9);
  }else if(Command.equalsIgnoreCase("Popcorn")){
    WiresConnect(4,11); //stop
    delay(100);
    WiresConnect(2,14);  //popcorn
    delay(100);
    WiresConnect(4,10); //start
  }else if(Command.equalsIgnoreCase("p10s")){
    SetTime=SetTime+10;
    SetSec=SetTime%60;
    SetMinutes=SetTime/60;
//    Serial.print("SetTime ");
//    Serial.print(SetTime);
//    Serial.print("  SetSec ");
//    Serial.print(SetSec);
//    Serial.print("  SetMinutes ");
//    Serial.println(SetMinutes);
    
    // set time on micro:
    WiresConnect(4,11); //stop/clear
    delay(100);
    SetNum(SetMinutes/10);
    SetNum(SetMinutes%10);
    SetNum(SetSec/10);
    SetNum(SetSec%10);
  }
  
  Command=""; // initialize command  
}

/////////////
// Set num //
/////////////
void SetNum(int Num){
//    Serial.print(" Num ");
//    Serial.println(Num);
  switch (Num) {
    case 0:
      WiresConnect(5,14);
      break;
    case 1:
      WiresConnect(5,13);
      break;
    case 2:
      WiresConnect(5,12);
      break;
    case 3:
      WiresConnect(5,11);
      break;
    case 4:
      WiresConnect(5,10);
      break;
    case 5:
      WiresConnect(5,9);
      break;
    case 6:
      WiresConnect(5,8);
      break;
    case 7:
      WiresConnect(4,14);
      break;
    case 8:
      WiresConnect(4,13);
      break;
    case 9:
      WiresConnect(4,12);
      break;
  }
  delay(100);
}


///////////////////////////////////////
// Press Key  by connecting 2 wires  //
///////////////////////////////////////

void WiresConnect(int wire1, int wire2){
//      Serial.print("Connect wires ");
      // set up MUX1, MUX2
      SetMux(wire1,Mux1s0,Mux1s1,Mux1s2,Mux1s3);
      SetMux(wire2,Mux2s0,Mux2s1,Mux2s2,Mux2s3);
      digitalWrite(Mux_En, LOW); // Enable MUX with the new settings, 
      delay(100); // Delay to make sure key is pressed
      digitalWrite(Mux_En, HIGH); // disable MUX
//      Serial.println();
}

//////////////////
// Set Mux Pins //
//////////////////

void SetMux(int channel, int s0, int s1, int s2, int s3){
  int controlPin[] = {s0, s1, s2, s3};
  int muxChannel[16][4]={
    {0,0,0,0}, //channel 0
    {1,0,0,0}, //channel 1
    {0,1,0,0}, //channel 2
    {1,1,0,0}, //channel 3
    {0,0,1,0}, //channel 4
    {1,0,1,0}, //channel 5
    {0,1,1,0}, //channel 6
    {1,1,1,0}, //channel 7
    {0,0,0,1}, //channel 8
    {1,0,0,1}, //channel 9
    {0,1,0,1}, //channel 10
    {1,1,0,1}, //channel 11
    {0,0,1,1}, //channel 12
    {1,0,1,1}, //channel 13
    {0,1,1,1}, //channel 14
    {1,1,1,1}  //channel 15
  };

  //loop through the 4 sig to set channle
  for(int i = 0; i < 4; i ++){
    digitalWrite(controlPin[i], muxChannel[channel][i]);
  }
//  Serial.print(" channle: ");
//  Serial.print(channel);
}

