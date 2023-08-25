import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SubnavbarComponent } from './subnavbar/subnavbar.component';
import { HomeNavbarComponent } from './home-navbar/home-navbar.component';
import { WeatherCardComponent } from './weather-card/weather-card.component';

const routes: Routes = [
   
        {path: 'subnavbar', component: SubnavbarComponent},
        {path:'home-navbar',component:HomeNavbarComponent},
        {path:'weathercard',component:WeatherCardComponent}
       
   
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ComponentsRoutingModule { }