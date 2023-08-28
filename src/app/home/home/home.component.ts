import { Component,Input } from '@angular/core';

import { Subscription } from 'rxjs';

import { tap} from 'rxjs/operators';

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

  @Input() isSelected: boolean = false;
   
  cityName:string = 'Nairobi';
  
  IweatherData?: IweatherData;

  selectedDate: string = '';

  forecastData?: iForecastday[];

  selectedUnits: string = 'metric';

  weatherSubscription: Subscription | undefined;



  ngOnInit(): void {
    this.getWeatherData(this.cityName,this.selectedDate);
    this.cityName = '';

  }
  
    onSubmit() {
      if (this.cityName && this.selectedDate) {
        this.getWeatherData(this.cityName,this.selectedDate);
        this.cityName = '';
        this.selectedDate = '';
      } 
    }
    

    private getWeatherData(cityName: string, units: string, date?: string) {
      const request = date ? this.weatherService.getWeatherData(date, cityName) : this.weatherService.getWeatherData(cityName, units);
      this.weatherSubscription = request.pipe( 
        tap(response => {
          this.IweatherData = response;
          console.log(response);
        })
      ).subscribe();
    }
    
    onDateChange(date?:string) {
      if (this.selectedDate) {
        this.getWeatherData(this.cityName, this.selectedDate);
      }
    }

    onUnitsChange() {
      if (this.weatherSubscription) { //checks if there is a current API call
        this.weatherSubscription.unsubscribe(); //if true unsubscribe 
      }
      if (this.cityName && this.selectedUnits) {  //check if both of these are available
        this.getWeatherData(this.cityName, this.selectedUnits); //fetch weather data with new units //triggers new API call
      }
    }
    
    
  }

  