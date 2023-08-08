import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeAdminComponent } from './welcome-admin/welcome-admin.component';
import { ListComponent } from './list/list.component';


const routes: Routes = [
    
       {path: 'welcome-admin',component:WelcomeAdminComponent},
       {path:'list',component:ListComponent}

      
        
        
    
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule { }