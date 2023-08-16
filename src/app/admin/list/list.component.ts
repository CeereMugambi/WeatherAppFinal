import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { first } from 'rxjs/operators';

import { AccountService } from 'src/app/services';

@Component({ selector: 'app-list',
templateUrl: './list.component.html',
styleUrls: ['./list.component.sass']
})
export class ListComponent implements OnInit {
    accounts?: any[];
    dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
    

    constructor(private accountService: AccountService) { }

    ngOnInit() {
      this.accountService.getAll()
        .pipe(first())
        .subscribe(accounts => {
          this.accounts = accounts;
          this.dataSource.data = this.accounts;
        });
  }

  deleteAccount(id: string) {
    const account = this.accounts!.find(x => x.id === id);
    if (account) {
      account.isDeleting = true;
      this.accountService.delete(id)
        .pipe(first())
        .subscribe(() => {
          this.accounts = this.accounts!.filter(x => x.id !== id);
          this.dataSource.data = this.accounts;
        });
    }
  }
}