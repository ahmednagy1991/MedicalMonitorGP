#include "HttpModule/requestHandler.h";
#include "Configurations/globalConfig.h"




void setup() {
  Serial.begin(SerialPortBaudRate);
  display.setRotation(2);
  display.begin(SSD1306_SWITCHCAPVCC, 0x3C); //Start the OLED display
  display.display();
  InitConnection();
}

void loop() {
  server.handleClient();
}
