import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeAdminComponent } from './welcome-admin/welcome-admin.component';


const routes: Routes = [
    
       {path: 'welcome-admin',component:WelcomeAdminComponent},
      
        
        
    
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule { }