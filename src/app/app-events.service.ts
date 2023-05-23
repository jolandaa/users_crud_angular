import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';

interface StateEvent {
  name: string;
  data: any;
}

@Injectable({
  providedIn: 'root'
})
export class AppEvents {
  private appState = new Subject<any>();
  appState$ = this.appState.asObservable();

  constructor(private snackbar: MatSnackBar) {}

  notify(data: StateEvent) {
    this.appState.next(data);
  }

  showSuccessToast(message: string) {
    this.snackbar.open(message, '', {
      duration: 4000,
      panelClass: ['ezlend-success']
    });
  }

  showFailureToast(message: string, duration = 4000) {
    this.snackbar.open(message, '', {
      duration,
      panelClass: ['ezlend-error']
    });
  }

  setAppLoadingState(busy = false) {
    this.appState.next({ name: 'loading', data: busy })
  }
}
