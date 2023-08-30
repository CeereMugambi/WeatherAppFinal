import { Component,Input,OnInit } from '@angular/core';

import { Subscription ,BehaviorSubject} from 'rxjs';

import { tap } from 'rxjs';

import { HttpClient } from '@angular/common/http';

import { WeatherService } from 'src/app/services';

import { IweatherData, iForecastday } from 'src/app/models';

import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-weathercard-info',
  templateUrl: './weathercard-info.component.html',
  styleUrls: ['./weathercard-info.component.sass']
  
})
export class WeathercardInfoComponent implements OnInit {

  constructor(private http: HttpClient, private weatherService: WeatherService,private snackBar: MatSnackBar) {}

  @Input() forecastDay!: any;
  @Input() labelImageSrc!: string;
  @Input() labelText!: string;
  @Input() buttonToggleOptions!: string[];
  @Input() unitSymbols!: string[];
  selectedUnits: 'metric' | 'imperial' = 'metric';
  @Input() value1!: number;
  @Input() value2!: number;
  cityName:string = '';


  IweatherData?: IweatherData;
  weatherSubscription: Subscription | undefined;

  private weatherDataSubject = new BehaviorSubject<IweatherData | null>(null);


  ngOnInit(): void {
    this.weatherDataSubject.subscribe(response => { //subscribe to the weatherDataSubject
      if (response) {
        this.IweatherData = response;
        console.log(response);
      }
    });
      
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

    ngOnDestroy(): void {
      if (this.weatherSubscription) {
        this.weatherSubscription.unsubscribe(); //unsubscribe from any service to avoid memory leaks
      }
    }

}
