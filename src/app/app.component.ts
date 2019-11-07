import { logout } from './auth/auth.actions';
import { isLoggedIn, isLoggedOut } from './auth/auth.selector';
import { AppState } from './reducers/index';
import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
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
      private store: Store<AppState>
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

      this.isLoggedIn$ = this.store
        .pipe( // Apply here operators
          select(isLoggedIn)
        );

      this.isLoggedOut$ = this.store
        .pipe( // Apply here operators
          map(isLoggedOut)
        );

    }

    logout() {
      console.log('Call logout()');
      this.store.dispatch(logout());
    }

}
