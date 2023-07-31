import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './helpers';

const AccountModule = () => import('./account/account.module').then(x => x.AccountModule);
const ComponentsModule = () => import('./components/components.module').then(x => x.ComponentsModule);
const HomeModule = ()=>import('./home/home.module').then(x=>x.HomeModule)



const routes: Routes = [
  {path:'account',loadChildren:AccountModule},
  {path:'components',loadChildren:ComponentsModule,},
  {path: 'home', loadChildren: HomeModule, canActivate: [AuthGuard] },


  //Unrecognised routes redirect
  { path: 'subnavbar', redirectTo: './', pathMatch: "full" },
  { path: '', redirectTo: 'welcome', pathMatch: "full" },
  { path: '**', redirectTo: 'Welcome' },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
