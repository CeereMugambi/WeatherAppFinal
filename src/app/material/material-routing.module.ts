import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ButtonsComponent } from './buttons/buttons.component';
import { CardComponent } from './card/card.component';
import { IconsComponent } from './icons/icons.component';
import { MaterialModule } from './material.module';

const routes: Routes = [
    {
        path: '', component: MaterialModule
        
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProfileRoutingModule { }