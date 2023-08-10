import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailsComponent } from './details/details.component';
import { MaterialModule } from '../material/material.module';
import { ComponentsModule } from '../components/components.module';
import { AccountModule } from '../account/account.module';
import { profileRoutingModule } from './profile-routing.module';



@NgModule({
  declarations: [
    DetailsComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ComponentsModule,
    AccountModule,
    profileRoutingModule
  ],
  exports:[
    DetailsComponent
  ]
})
export class ProfileModule { }
