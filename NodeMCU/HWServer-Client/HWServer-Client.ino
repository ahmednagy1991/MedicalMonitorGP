#include <Arduino.h>
#ifdef ESP32
#include <WiFi.h>
#else
#include <ESP8266WiFi.h>
#endif
#include <ESP8266WebServer.h>
#include <ArduinoJson.h>


#define LED D0
#define SPort 115200
ESP8266WebServer server(80);

void setup() {
  InitConnection("WE_B78088", "k6522162");
}

void loop() {
  server.handleClient();
}

void InitConnection(char* ssid, char* password)
{
  pinMode(LED, OUTPUT);
  digitalWrite(LED, LOW);
  Serial.begin(SPort);
  delay(10);

  IPAddress ip(192, 168, 1, 40);
  IPAddress dns(192, 168, 1, 1);
  IPAddress gateway(192, 168, 1, 1);
  IPAddress subnet(255, 255, 255, 0);
  WiFi.config(ip, dns, gateway, subnet);

  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print("...");
  }
  Serial.println("WiFi connected");
  Serial.println();

  server.on("/", handle_OnConnect);
  server.on("/ping", handle_ping);
  server.onNotFound(handle_NotFound);

  server.begin();
  digitalWrite(LED, HIGH);
  Serial.println("Web server running.");
  delay(500);

  Serial.println(WiFi.localIP());
}

void handle_OnConnect() {
  server.send(200, "text/html", "connected");
}

void handle_ping() {
  StaticJsonDocument<200> ping_ret;
  String resp;
  ping_ret["message"] = "pong";
  serializeJson(ping_ret, resp);
  server.send(200, "application/json", resp);
}

void handle_NotFound() {
  StaticJsonDocument<200> NotFound_ret;
  String resp;
  NotFound_ret["message"] = "Not found";
  serializeJson(NotFound_ret, resp);
  server.send(404, "application/json", resp);
}
