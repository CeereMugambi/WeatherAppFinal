import { Component,} from '@angular/core';
import { Router } from '@angular/router';



@Component({ 
  templateUrl: 'edit-admin.component.html',
  styleUrls: ['./edit-admin.component.sass'],
 })

export class EditAdminComponent {
    title!: string;

    constructor(private router: Router) {}
    
    onChangeRoute() {
        // Change the route here
        this.router.navigate(['./list']); 
    }



}