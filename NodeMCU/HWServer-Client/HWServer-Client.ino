#include "HttpModule/requestHandler.h";
#include "Configurations/globalConfig.h"

void setup() {
  Serial.begin(SerialPortBaudRate);
  InitConnection();
}

void loop() {
  server.handleClient();
}
