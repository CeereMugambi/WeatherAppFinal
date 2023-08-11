import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackgroundComponent } from './background/background.component';
import { CardComponent } from './card/card.component';
import { SubnavbarComponent } from './subnavbar/subnavbar.component';
import { MaterialModule } from '../material/material.module';
import { ComponentsRoutingModule } from './components-routing.module';
import { HomeNavbarComponent } from './home-navbar/home-navbar.component';
import { AlertComponent } from './alert/alert.component';




@NgModule({
  declarations: [
    BackgroundComponent,
    CardComponent,
    SubnavbarComponent,
    HomeNavbarComponent,
    AlertComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ComponentsRoutingModule

  ],
  
  exports:[
    BackgroundComponent,
    CardComponent,
    SubnavbarComponent,
    HomeNavbarComponent,
    AlertComponent
  ]
  
    
  
})
export class ComponentsModule { }
