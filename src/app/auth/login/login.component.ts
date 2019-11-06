import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {Store} from '@ngrx/store';

import {AuthService} from '../auth.service';
import {tap} from 'rxjs/operators';
import {noop} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor(
      private fb: FormBuilder,
      private auth: AuthService,
      private router: Router) {

      this.form = fb.group({
          email: ['test@angular-university.io', [Validators.required]],
          password: ['test', [Validators.required]]
      });

  }

  ngOnInit() {

  }

  login() {
    console.log('Call login()');
    const val = this.form.value;
    this.auth.login(val.email, val.password)
      .pipe(
        tap( // Side effect over the stream
          user => {
            console.log(user);
            // Store data
            // TODO
            // Navigation to the course page
            this.router.navigateByUrl('/courses');
          }
        )
      )
      .subscribe(
        noop,
        (err) => {
          console.log(err);
          alert('Login failed');
        }
      );
  }

}

