#include <Adafruit_MLX90614.h> //temperature sensor library
#include <Arduino.h>
#include <Adafruit_GFX.h> //OLED libraries
#include <Adafruit_SSD1306.h>

#include <Wire.h>
#include "SharedModule.h"

double ReadTemprature()
{
    Adafruit_MLX90614 mlx = Adafruit_MLX90614();
    const byte RATE_SIZE = 17; //Increase this for more averaging. 4 is good.
    byte rates[RATE_SIZE];     //Array of heart rates
    byte rateSpot = 0;
    long lastBeat = 0; //Time at which the last beat occurred
    float beatsPerMinute;
    int beatAvg;
    int flagx = 0;
    int condition_counter = 0;
    int conditions_sum = 0;
    int flagxx = 0;
    int flag = 0;
    int fHR;
    int fspo2;
    float ftemp, fftemp;
    const int buttonPin = 13; //might be a different value
    int flagy = 0;
    float ttemp[25];
    int counter = 0;
    float tempo = 0;
    int dd = 1;
    int ind = 0;
    int fcount, fcount2;
    int check_counter = 1;
    float ftemparray[3];
    int fbloodsugar;
    int buttonState = 0;

    int senRead = A0;
    int val = 0;
    int vall = 0;
    int glucoselevel = 0;
    int arr[50];
    int finalval = 0;
    int gl = 0;
    int bs_counter = 0;
    int finalval_glucoselevel = 0;
    long irValue = 2000;

    return mlx.readObjectTempC();
    if (mlx.readObjectTempC() > 36.1 && mlx.readObjectTempC() < 37.5)
    {
        // patient is using temperature sensor and not using the other(s)
        if (dd <= 1)
        {
            for (int mi = 0; mi < 25; mi++)
            {
                if (mlx.readObjectTempC() > 36.1 && mlx.readObjectTempC() < 37.5)
                {

                    ttemp[mi] = mlx.readObjectTempC();
                    delay(.99);
                }
            }
            dd++;
            for (int mi = 0; mi < 25; mi++)
            {
                if ((ttemp[mi]) > 0)
                {
                    counter++;
                }
            }
            for (int mi = 0; mi < 25; mi++)
            {
                tempo = tempo + ttemp[mi];
            }
        }
        fftemp = tempo / counter;

        ftemparray[ind] = fftemp;

        ind++;
        if (ftemparray[2] > 0)
        {
            sortArray(ftemparray, 3);
            ftemp = ftemparray[1];
        }
    }
    dd = 1;

    if (irValue < 7000 && ftemparray[0] > 0)
    {

        for (int zz = 1; zz < 3; zz++)
        {
            if (ftemparray[zz] <= 0)
            {
                if (fcount <= 0)
                {
                    display.clearDisplay();
                    display.setTextSize(1);
                    display.setTextColor(WHITE);
                    display.setCursor(30, 5);
                    display.println("  remove finger  ");
                    display.display();
                    delay(2000);
                    display.clearDisplay();
                    display.setTextSize(1);
                    display.setTextColor(WHITE);
                    display.setCursor(30, 5);
                    display.println("  REPEAT!  ");
                    display.display();
                    delay(2000);
                }
            }
            fcount++;
        }
    }

    if (irValue < 7000 && ftemparray[1] > 0)
    {

        for (int zz = 1; zz < 3; zz++)
        {
            if (ftemparray[zz] <= 0)
            {
                if (fcount2 <= 0)
                {
                    display.clearDisplay();
                    display.setTextSize(1);
                    display.setTextColor(WHITE);
                    display.setCursor(30, 5);
                    display.println("  remove finger  ");
                    display.display();
                    delay(2000);
                    display.clearDisplay();
                    display.setTextSize(1);
                    display.setTextColor(WHITE);
                    display.setCursor(30, 5);
                    display.println("  REPEAT!  ");
                    display.display();
                    delay(2000);
                }
            }
        }
        fcount2++;
    }
    ///////////////////////////////////////////////////////////

    if ((irValue / 1130) > 95)
    {
        fspo2 = irValue / 1160;
    }
    //////////////////////////////////////////////////
    if (beatAvg > 70)
    {
        fHR = beatAvg;
    }
    return ftemp;
}
