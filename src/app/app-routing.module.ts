import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { LoginComponent } from './account/login/login.component';

const AccountModule = () => import('./account/account.module').then(x => x.AccountModule);


const routes: Routes = [
  {path:'Welcome',component:WelcomeComponent},
  {path:'login', component: LoginComponent },
  {path:'account',loadChildren:AccountModule},

  //Unrecognised routes redirect
  { path: '', redirectTo: 'welcome', pathMatch: "full" },
  { path: '**', redirectTo: 'Welcome' },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
