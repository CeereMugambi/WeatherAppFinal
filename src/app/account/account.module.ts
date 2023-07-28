import { NgModule ,CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Import ReactiveFormsModule
import { AccountRoutingModule } from './account-routing.component';
import { LoginComponent } from './login/login.component';
import { ComponentsModule } from '../components/components.module';
import { BackgroundComponent } from '../components/background/background.component';



@NgModule({
  declarations: [ 
    LoginComponent
    ],

  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    AccountRoutingModule,
    ComponentsModule,
  
  ],
  // exports:[RegisterloginComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AccountModule { }
