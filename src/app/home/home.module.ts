import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { homeRoutingModule } from './home-routing.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MaterialModule,
    homeRoutingModule

  ]
})
export class HomeModule { }
