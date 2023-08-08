import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WelcomeAdminComponent } from './welcome-admin/welcome-admin.component';
import { WelcomeRoutingModule } from '../welcome/welcome-routing.component';
import { AdminRoutingModule } from './admin-routing.module';
import { MaterialModule } from '../material/material.module';
import { ComponentsModule } from '../components/components.module';



@NgModule({
  declarations: [
    WelcomeAdminComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule,
    ComponentsModule,
  
    ],

  exports:[
    WelcomeAdminComponent
  ]
})
export class AdminModule { }
