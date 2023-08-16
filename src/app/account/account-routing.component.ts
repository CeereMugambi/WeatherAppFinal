import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';


const routes: Routes = [
    
       {path: 'login',component:LoginComponent},
       {path: 'registration',component:RegistrationComponent},
       {path: 'verify-email',component:VerifyEmailComponent},
       {path:'forgot-password',component:ForgotPasswordComponent}
        
        
    
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AccountRoutingModule { }