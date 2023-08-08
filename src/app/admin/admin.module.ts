import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WelcomeAdminComponent } from './welcome-admin/welcome-admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { MaterialModule } from '../material/material.module';
import { ComponentsModule } from '../components/components.module';
import { ListComponent } from './list/list.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    WelcomeAdminComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule,
    ComponentsModule,
    ReactiveFormsModule,
  
    ],

  exports:[
    WelcomeAdminComponent,
    ListComponent
  ]
})
export class AdminModule { }
