import { NgModule ,CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Import ReactiveFormsModule
import { AccountRoutingModule } from './account-routing.component';
import { LoginComponent } from './login/login.component';
import { ComponentsModule } from '../components/components.module';
import { RegistrationComponent } from './registration/registration.component';



@NgModule({
  declarations: [ 
    LoginComponent, RegistrationComponent,
    ],

  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    AccountRoutingModule,
    ComponentsModule,

  
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AccountModule { }
