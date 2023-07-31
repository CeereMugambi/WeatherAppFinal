import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const AccountModule = () => import('./account/account.module').then(x => x.AccountModule);
const ComponentsModule = () => import('./components/components.module').then(x => x.ComponentsModule);



const routes: Routes = [
  {path:'account',loadChildren:AccountModule},
  {path:'components',loadChildren:ComponentsModule,},

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
