import { Component } from '@angular/core';
import { AccountService } from 'src/app/services';
import { IRole } from 'src/app/models';
import { IAccount } from 'src/app/models';

@Component({
  selector: 'app-home-navbar',
  templateUrl: './home-navbar.component.html',
  styleUrls: ['./home-navbar.component.sass']
})
export class HomeNavbarComponent {
  Role = IRole;
  account?: IAccount | null;
  

  constructor(private accountService: AccountService,) {
    this.accountService.account.subscribe(x => this.account = x);
  }


  logout() {
    this.accountService.logout();
  }
 
  isDropdownOpen = false;
  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
  

  isForecastVisible: boolean = false;

  toggleForecast() {
    this.isForecastVisible = !this.isForecastVisible;
  }
  

}
