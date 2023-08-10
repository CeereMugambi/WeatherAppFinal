import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailsComponent } from './details/details.component';
import { MaterialModule } from '../material/material.module';
import { ComponentsModule } from '../components/components.module';
import { AccountModule } from '../account/account.module';



@NgModule({
  declarations: [
    DetailsComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ComponentsModule,
    AccountModule,
  ],
  exports:[
    DetailsComponent
  ]
})
export class ProfileModule { }
