import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, Subject } from 'rxjs';
import { filter } from 'rxjs/operators';

import { Alert, AlertType } from '../models';

@Injectable({ providedIn: 'root' })
export class AlertService {
    private subject = new Subject<Alert>();
    private defaultId = 'default-alert';

    constructor(private snackBar: MatSnackBar) {} // Inject MatSnackBar

    // enable subscribing to alerts observable
    onAlert(id = this.defaultId): Observable<Alert> {
        return this.subject.asObservable().pipe(filter(x => x && x.id === id));
    }

    // convenience methods
    success(message: string, options?: any) {
        this.alert(new Alert({ ...options, type: AlertType.Success, message }));
    }

    error(message: string, options?: any) {
        this.alert(new Alert({ ...options, type: AlertType.Error, message }));
    }

    info(message: string, options?: any) {
        this.alert(new Alert({ ...options, type: AlertType.Info, message }));
    }

    warn(message: string, options?: any) {
        this.alert(new Alert({ ...options, type: AlertType.Warning, message }));
    }

    // core alert method
    alert(alert: Alert) {
        alert.id = alert.id || this.defaultId;
        alert.autoClose = alert.autoClose === undefined ? true : alert.autoClose;

        if (alert.autoClose && alert.message) {
            const duration = alert.fade ? 250 : 3000;

            // Determine panelClass based on the alert type
            let panelClass = '';
            switch (alert.type) {
                case AlertType.Success:
                    panelClass = 'success-snackbar';
                    break;
                case AlertType.Error:
                    panelClass = 'error-snackbar';
                    break;
                case AlertType.Info:
                    panelClass = 'info-snackbar';
                    break;
                case AlertType.Warning:
                    panelClass = 'warning-snackbar';
                    break;
            }

            this.snackBar.open(alert.message, 'Close', {
                duration,
                panelClass // Apply the appropriate panelClass
            });
        }

        this.subject.next(alert);
    }

    clear(id = this.defaultId) {
        this.subject.next(new Alert({ id }));
    }
}