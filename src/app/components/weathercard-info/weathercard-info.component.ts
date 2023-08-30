import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { WeatherService } from 'src/app/services';
import { IweatherData } from 'src/app/models';
import { MatSnackBar } from '@angular/material/snack-bar';
import { __values } from 'tslib';

@Component({
  selector: 'app-weathercard-info',
  templateUrl: './weathercard-info.component.html',
  styleUrls: ['./weathercard-info.component.sass']
})
export class WeathercardInfoComponent implements OnInit, OnDestroy {
  @Input() forecastDay!: any;
  @Input() labelImageSrc!: string;
  @Input() labelText!: string;
  @Input() buttonToggleOptions!: string[];
  @Input() unitSymbols!: string[];
  selectedUnits: 'metric' | 'imperial' = 'metric';
  @Input() temperature!: number[];

  
  cityName: string = '';
  IweatherData?: IweatherData;
  private weatherSubscription: Subscription | undefined;

  private weatherDataSubject = new BehaviorSubject<IweatherData | null>(null);

  constructor(
    private http: HttpClient,
    private weatherService: WeatherService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
     //initial data fetch when component initializes
     if (this.cityName && this.selectedUnits) {
      this.getWeatherData(this.cityName, this.selectedUnits);
    }

    this.weatherSubscription = this.weatherDataSubject.subscribe(response => {
      if (response) {
        this.IweatherData = response;
        console.log(response);
      }
     
    });
  }

  private getWeatherData(cityName: string, units: string, date?: string) {
    const request = date
      ? this.weatherService.getWeatherData(date, cityName)
      : this.weatherService.getWeatherData(cityName, units);
    request
      .pipe(
        tap(response => {
          this.weatherDataSubject.next(response);
        })
      )
      .subscribe();

  }
 

  onUnitsChange() {

    if (this.weatherSubscription) {
      this.weatherSubscription.unsubscribe(); // Unsubscribe from ongoing API call
    }
    // console.log(this.selectedUnits)
    if (this.cityName && this.selectedUnits) {
      this.getWeatherData(this.cityName, this.selectedUnits);
      console.log(this.selectedUnits);
      console.log(this.temperature);
      console.log(this.unitSymbols);
    }
  }
  

  ngOnDestroy(): void {
    if (this.weatherSubscription) {
      this.weatherSubscription.unsubscribe();
    }
  }
  
}
