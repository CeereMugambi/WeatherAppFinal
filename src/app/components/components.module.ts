import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackgroundComponent } from './background/background.component';
import { CardComponent } from './card/card.component';
import { SubnavbarComponent } from './subnavbar/subnavbar.component';
import { MaterialModule } from '../material/material.module';
import { ComponentsRoutingModule } from './components-routing.module';
import { HomeNavbarComponent } from './home-navbar/home-navbar.component';
import { AlertComponent } from './alert/alert.component';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WeatherCardComponent } from './weather-card/weather-card.component';




@NgModule({
  declarations: [
    BackgroundComponent,
    CardComponent,
    SubnavbarComponent,
    HomeNavbarComponent,
    AlertComponent,
    RegistrationFormComponent,
    WeatherCardComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ComponentsRoutingModule,
    ReactiveFormsModule,
    FormsModule

  ],
  
  exports:[
    BackgroundComponent,
    CardComponent,
    SubnavbarComponent,
    HomeNavbarComponent,
    AlertComponent,
    RegistrationFormComponent,
    WeatherCardComponent
  ]
  
    
  
})
export class ComponentsModule { }
