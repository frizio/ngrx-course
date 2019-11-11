import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Course } from './../model/course';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DefaultDataService, HttpUrlGenerator } from '@ngrx/data';


@Injectable()
export class CoursesDataService extends DefaultDataService<Course> {

  // API based REST (default assumption), WebSocket...
  constructor(
    http: HttpClient,                     // API based REST (default assumption), WebSocket...
    httpUrlGenerator: HttpUrlGenerator    // url start different by /api or /course-S
  ) {
    super('Course', http, httpUrlGenerator);
  }

  // Methods to override

  getAll(): Observable<Course[]> {
    return this.http.get('/api/courses')
    .pipe(
      map(res => res['payload'])
    );
  }

}
