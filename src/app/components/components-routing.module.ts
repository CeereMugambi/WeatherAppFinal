import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ComponentsModule } from './components.module';
import { BackgroundComponent } from './background/background.component';

const routes: Routes = [
    {
        path: '', component: ComponentsModule,
        children:[
           { path:'background',component:BackgroundComponent},
        ]
      
    
    },
   
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProfileRoutingModule { }