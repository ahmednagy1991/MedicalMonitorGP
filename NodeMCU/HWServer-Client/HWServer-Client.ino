#include <ESP8266WiFi.h>
#include "ESPAsyncWebServer.h"

#include <Wire.h>


// Set your access point network credentials
const char* ssid = "WE_B78088";
const char* password = "k6522162";


AsyncWebServer server(80);

String readTemp() {

}

String readHumi() {

}

String readPres() {

}

void setup() {
  // Serial port for debugging purposes
  Serial.begin(115200);
  Serial.println();

  // Setting the ESP as an access point
  Serial.print("Setting AP (Access Point)…");
  // Remove the password parameter, if you want the AP (Access Point) to be open
  WiFi.softAP(ssid, password);

  IPAddress local_IP(192, 168, 1, 22);
  IPAddress gateway(192, 168, 1, 1);
  IPAddress subnet(255, 255, 255, 0);
  WiFi.mode(WIFI_AP_STA);
  WiFi.softAPConfig(local_IP, local_IP, subnet);

  IPAddress IP = WiFi.softAPIP();

  Serial.print("AP IP address: ");
  Serial.println(IP);

  server.on("/temperature", HTTP_GET, [](AsyncWebServerRequest * request) {
    request->send_P(200, "text/plain", readTemp().c_str());
  });
  server.on("/humidity", HTTP_GET, [](AsyncWebServerRequest * request) {
    request->send_P(200, "text/plain", readHumi().c_str());
  });
  server.on("/pressure", HTTP_GET, [](AsyncWebServerRequest * request) {
    request->send_P(200, "text/plain", readPres().c_str());
  });
  server.on("/ping", HTTP_GET, [](AsyncWebServerRequest * request) {
    request->send_P(200, "text/plain", "pong");
  });



  // Start server
  server.begin();
  Serial.print("Server started");
}

void loop() {

}
