import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SubnavbarComponent } from './subnavbar/subnavbar.component';
import { AlertComponent } from './alert/alert.component';
import { HomeNavbarComponent } from './home-navbar/home-navbar.component';

const routes: Routes = [
   
        {path: 'subnavbar', component: SubnavbarComponent},
        {path: 'alert' ,component:AlertComponent},
        {path:'home-navbar',component:HomeNavbarComponent},
       
   
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ComponentsRoutingModule { }