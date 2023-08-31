import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { WeatherService } from 'src/app/services';
import { IweatherData,iForecast } from 'src/app/models';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  unitSymbols!: string[];
  selectedUnits: 'metric' | 'imperial' = 'metric';
  @Input() values!: number[];

  
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
      this.weatherSubscription = this.weatherDataSubject.subscribe(response => {
        if (response) {
          this.IweatherData = response;
          this.values = [this.values[0], this.values[1]];
        }
     
    });
  }

  private getWeatherData(cityName: string, units: string, date?: string) {
    const request = date
      ? this.weatherService.getWeatherData(date, units)
      : this.weatherService.getWeatherData(cityName, units);
    request
      .pipe(
        tap(response => {
          console.log('API Response:', response);
          this.weatherDataSubject.next(response);
        })
      );

  }

  onUnitsChange() {
    if (this.weatherSubscription) {
      this.weatherSubscription.unsubscribe(); // Unsubscribe from ongoing API call
    }
    
    console.log('Values:', this.values);

    if (this.cityName && this.selectedUnits) {
      this.getWeatherData(this.cityName, this.selectedUnits);
      console.log('Values:', this.values);



    }
  }

  ngOnDestroy(): void {
    if (this.weatherSubscription) {
      this.weatherSubscription.unsubscribe();
    }
  }
  
}
