import { Component, } from '@angular/core';
import { Router } from '@angular/router';

@Component({ 
  templateUrl: 'update.component.html',
  styleUrls:['update.component.sass']
 })
export class UpdateComponent {

    constructor(private router: Router) { }

    handleUpdateSuccess() {
        this.router.navigate(['../details']);
    }
}