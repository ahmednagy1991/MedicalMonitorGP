
#ifdef ESP32
#include <WiFi.h>
#else
#include <ESP8266WiFi.h>
#endif
#include <ESP8266WebServer.h>
#include <ESP8266HTTPClient.h>
#include <ArduinoJson.h>

//yousef code
//  #include <ArduinoSort.h>
//  #include <Adafruit_GFX.h>        //OLED libraries
//  #include <Adafruit_SSD1306.h>
//  #include "MAX30105.h"           //MAX3010x library
//  #include "heartRate.h"          //Heart rate calculating algorithm



#define HttpSuccess 200
#define HttpNotFound 401
#define HttpError 400
#define HttpInternalServerError 500




#include "../Configurations/httpConfig.h";
#include "Sensors/heartRateSensor.h";
#include "Sensors/TempratureSensor.h";

ESP8266WebServer server(80);
HTTPClient http;
WiFiClient client;

void handle_OnConnect()
{
  server.send(HttpSuccess, "application/json", "connected");
}

void handle_ping()
{
  StaticJsonDocument<200> ping_ret;
  String resp;
  ping_ret["message"] = "pong";
  serializeJson(ping_ret, resp);
  server.send(HttpSuccess, "application/json", resp);
}

void handle_getSensors()
{
  StaticJsonDocument<200> ping_ret;
  String resp;
  JsonArray array = ping_ret.to<JsonArray>();

  char json[] = "[{\"value\":\"HeartRate\",\"label\":\"HeartRate\",\"checked\":false},{\"value\":\"Temprature\",\"label\":\"Temprature\",\"checked\":false}]";
  deserializeJson(ping_ret, json);

  serializeJson(ping_ret, resp);
  server.send(HttpSuccess, "application/json", resp);
}

void handle_location()
{
  StaticJsonDocument<1000> location_ret;
  //String LocationURL = "http://arduinojson.org/example.json";
  String LocationURL = "http://jsonplaceholder.typicode.com/todos/1";
  String resp;

  http.begin(client, LocationURL);
  int httpCode = http.GET();
  Serial.println(httpCode);
  String payload = http.getString();
  Serial.println(payload);
  location_ret["statusCode"] = httpCode;
  if (httpCode == HttpSuccess)
  {
    location_ret["message"] = payload;
  }
  else
  {
    location_ret["message"] = "Failed connecting to : " + LocationURL + " status code : " + httpCode;
  }
  serializeJson(location_ret, resp);
  http.end();
  server.send(HttpSuccess, "application/json", resp);
}

void handle_NotFound()
{
  StaticJsonDocument<200> NotFound_ret;
  String resp;
  NotFound_ret["message"] = "Not found";
  serializeJson(NotFound_ret, resp);
  server.send(HttpNotFound, "application/json", resp);
}

void handle_readSensors()
{
  server.arg("plain");

  StaticJsonDocument<200> sen_ret;
  StaticJsonDocument<200> body;

  deserializeJson(body, server.arg("plain"));
  String resp;

  for (JsonVariant value : body["sensors"].as<JsonArray>())
  {
    if (value == "HeartRate")
    {
       sen_ret["HeartRate"] = ReadHeartRate();
     
    }
    else if (value == "Temprature")
    {
      sen_ret["Temprature"] = ReadTemprature();  
    }
  }

  serializeJson(sen_ret, resp);
  server.send(HttpSuccess, "application/json", resp);
}

void InitConnection()
{
  pinMode(WifiStatusLED, OUTPUT);
  digitalWrite(WifiStatusLED, LOW);
  delay(10);

  IPAddress ip(192, 168, 1, 40);
  IPAddress dns(192, 168, 1, 1);
  IPAddress gateway(192, 168, 1, 1);
  IPAddress subnet(255, 255, 255, 0);
  WiFi.config(ip, dns, gateway, subnet);

  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED)
  {
    delay(500);
    Serial.print("...");
  }
  Serial.println();
  Serial.println("WiFi connected");

  server.on("/", handle_OnConnect);
  server.on("/ping", handle_ping);
  server.on("/location", handle_location);
  server.on("/getSensors", handle_getSensors);
  server.on("/readSensors", HTTP_POST, handle_readSensors);
  server.onNotFound(handle_NotFound);

  server.begin();
  digitalWrite(WifiStatusLED, HIGH);
  Serial.println("Web server running.");
  delay(500);

  Serial.println(WiFi.localIP());
}
