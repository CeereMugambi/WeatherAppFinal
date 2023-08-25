import { Component } from '@angular/core';

import { ViewEncapsulation } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { WeatherService } from 'src/app/services';

import { IweatherData, iForecastday } from 'src/app/models';
@Component({ 
  selector:'home',
  templateUrl: 'home.component.html',
  styleUrls: [ 'home.component.sass'],
  encapsulation: ViewEncapsulation.None 
})

export class HomeComponent {

  constructor(private http: HttpClient, private weatherService: WeatherService) {}
   
  cityName:string = 'Nairobi';
  
  IweatherData?: IweatherData;

  selectedDate: string = '';

  forecastData?: iForecastday[];



  ngOnInit(): void {
    this.getWeatherData(this.cityName);
    this.cityName = '';

  }
  
    onSubmit() {
      if (this.cityName && this.selectedDate) {
        this.getWeatherData(this.cityName);
        this.cityName = '';
        this.selectedDate = '';
      } 
    }
    

    private getWeatherData(cityName: string, date?: string) {
      const request = date ? this.weatherService.getWeatherData(date) : this.weatherService.getWeatherData(cityName);
      request.subscribe({
        next:(response) => {
          this.IweatherData = response;
          console.log(response);
        }
      });
    }

    onDateChange(date?:string) {
      if (this.selectedDate) {
        this.getWeatherData(this.cityName, this.selectedDate);
      }
    }
  }

  