import { Component,Input } from '@angular/core';

import { Subscription ,BehaviorSubject} from 'rxjs';

import { tap } from 'rxjs';

import { ViewEncapsulation } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { WeatherService } from 'src/app/services';

import { IweatherData, iForecastday } from 'src/app/models';

import { MatSnackBar } from '@angular/material/snack-bar';



@Component({ 
  selector:'home',
  templateUrl: 'home.component.html',
  styleUrls: [ 'home.component.sass'],
  encapsulation: ViewEncapsulation.None 
})

export class HomeComponent {

  constructor(private http: HttpClient, private weatherService: WeatherService,private snackBar: MatSnackBar) {}

  @Input() isSelected: boolean = false;
   
  cityName:string = 'Nairobi';
  
  IweatherData?: IweatherData;

  selectedDate: string = '';

  forecastData?: iForecastday[];

  selectedUnits: string = 'metric';

  weatherSubscription: Subscription | undefined;

  errorMessage: string | null = null;


  private weatherDataSubject = new BehaviorSubject<IweatherData | null>(null);

  ngOnInit(): void {
    this.getWeatherData(this.cityName, this.selectedDate);
    this.cityName = '';

    this.weatherDataSubject.subscribe(response => { //subscribe to the weatherDataSubject
      if (response) {
        this.IweatherData = response;
        console.log(response);
      }
    });
  }
  
  onSubmit() {
    if (!this.selectedDate) {
      this.errorMessage = 'Please select a date before clicking Submit.';
      this.openSnackBar(this.errorMessage); // Display the error message as a snackbar

      return;
    }
  
    if (this.cityName && this.selectedDate) {
      this.getWeatherData(this.cityName, this.selectedDate);
      this.cityName = '';
      this.selectedDate = '';
      this.openSnackBar('Form submitted successfully!');
      this.errorMessage = null; // Clear the error message if the submission is successful

    }
  }

    onDateChange(date?:string) {
      if (this.selectedDate) {
        this.getWeatherData(this.cityName, this.selectedDate);
      }
    }

    private getWeatherData(cityName: string, units: string, date?: string) {
      const request = date ? this.weatherService.getWeatherData(date, cityName) : this.weatherService.getWeatherData(cityName, units);
      request.pipe(
        tap(response => {
          this.weatherDataSubject.next(response); // Emit the fetched weather data to subject
      })
      ).subscribe();
    }

    onUnitsChange() {
      if (this.weatherSubscription) {
        this.weatherSubscription.unsubscribe(); //unsubscribe from ongoing API call
      }
      if(this.cityName && this.selectedUnits) { //fetch new data with new unit
        this.getWeatherData(this.cityName, this.selectedUnits); //emits to the behaviour subject for update 
      }
    }

    private openSnackBar(message: string) {
      this.snackBar.open(message, 'Dismiss', {
        duration: 3000, // Duration in milliseconds
        horizontalPosition: 'center',
        verticalPosition: 'top'
      });
    }
    
    
    ngOnDestroy(): void {
      if (this.weatherSubscription) {
        this.weatherSubscription.unsubscribe(); //unsubscribe from any service to avoid memory leaks
      }
    }
    
    
  }

  