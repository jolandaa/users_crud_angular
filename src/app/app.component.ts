import { Component } from '@angular/core';
import {delay, filter, map} from "rxjs";
import {AppEvents} from "./app-events.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'users-crud-angular';

  isLoading$ = this.appEvents.appState$.pipe(
    filter(state => state.name == 'loading'),
    map(state => state.data),
    delay(1000)
  );

  constructor(private appEvents: AppEvents) {
  }
}
