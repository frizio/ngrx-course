import { AppState } from './reducers/index';
import {Component, OnInit} from '@angular/core';
import {select, Store, State} from '@ngrx/store';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    loading = true;

    isLoggedIn$: Observable<boolean>;

    isLoggedOut$: Observable<boolean>;

    constructor(
      private router: Router,
      private store: State<AppState>
    ) {

    }

    ngOnInit() {

      this.router.events.subscribe(event  => {
        switch (true) {
          case event instanceof NavigationStart: {
            this.loading = true;
            break;
          }

          case event instanceof NavigationEnd:
          case event instanceof NavigationCancel:
          case event instanceof NavigationError: {
            this.loading = false;
            break;
          }
          default: {
            break;
          }
        }
      });

      /*
      this.store.subscribe(
        state => {
          console.log('Store value', state);
        }
      );
      */

      this.isLoggedIn$ = this.store
        .pipe( // Apply here operators
          map(state => !!state.auth.user )
        );

      this.isLoggedOut$ = this.store
        .pipe( // Apply here operators
          map(state => !state.auth.user )
        );

    }

    logout() {
      console.log('Call logout()');
    }

}
