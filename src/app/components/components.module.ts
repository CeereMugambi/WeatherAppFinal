import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackgroundComponent } from './background/background.component';
import { CardComponent } from './card/card.component';




@NgModule({
  declarations: [
    BackgroundComponent,
    CardComponent
  ],
  imports: [
    CommonModule,
  ],
  
  exports:[
    BackgroundComponent,
    CardComponent
  ]
  
    
  
})
export class ComponentsModule { }
