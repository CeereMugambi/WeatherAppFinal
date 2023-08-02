import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { homeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import { AccountModule } from '../account/account.module';



@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    homeRoutingModule,
    AccountModule

  ],
  exports:[
    HomeComponent
  ]
})
export class HomeModule { }
