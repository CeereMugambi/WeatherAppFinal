import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Subscription } from 'rxjs';

import { MatSnackBar } from '@angular/material/snack-bar';
import { Alert,AlertType } from 'src/app/models';
import { AlertService } from 'src/app/services';
@Component({
    selector: 'app-alert',
    templateUrl: 'alert.component.html',
    styleUrls: ['alert.component.sass']
})
export class AlertComponent implements OnInit, OnDestroy {
    @Input() id = 'default-alert';

    alerts: Alert[] = [];
    alertSubscription!: Subscription;
    routeSubscription!: Subscription;

    constructor(
        private router: Router,
        private alertService: AlertService,
        private snackBar: MatSnackBar
    ) {}

    ngOnInit() {
        this.alertSubscription = this.alertService.onAlert(this.id)
            .subscribe(alert => {
                if (!alert.message) {
                    this.alerts = this.alerts.filter(x => x.keepAfterRouteChange);
                    this.alerts.forEach(x => delete x.keepAfterRouteChange);
                    return;
                }

                this.alerts.push(alert);

                if (alert.autoClose) {
                    this.openSnackBar(alert.message, alert.type);
                }
            });

        this.routeSubscription = this.router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
                this.alertService.clear(this.id);
            }
        });
    }

    ngOnDestroy() {
        this.alertSubscription.unsubscribe();
        this.routeSubscription.unsubscribe();
    }

    openSnackBar(message: string, alertType: AlertType | undefined) {
        this.snackBar.open(message, 'Close', {
            duration: 3000,
            panelClass: this.getSnackBarCssClass(alertType)
        });
    }

    getSnackBarCssClass(alertType: AlertType | undefined): string {
        switch (alertType) {
            case AlertType.Success:
                return 'snackbar-success';
            case AlertType.Error:
                return 'snackbar-error';
            case AlertType.Info:
                return 'snackbar-info';
            case AlertType.Warning:
                return 'snackbar-warning';
            default:
                return '';
        }
    }
}
