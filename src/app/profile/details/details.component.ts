import { Component } from '@angular/core';
import { AccountService } from 'src/app/services';

@Component({ 
  templateUrl: 'details.component.html',
styleUrls:['details.component.sass'] 
})

export class DetailsComponent {
    account = this.accountService.accountValue;

    constructor(private accountService: AccountService) { }
}