import { map } from 'rxjs/operators';
import { CourseEntityService } from './courses-entity.service';
import { Observable } from 'rxjs';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class CoursesResolver implements Resolve<boolean> {

  constructor(
    private coursesService: CourseEntityService
  ) {}

  resolve( route: ActivatedRouteSnapshot,
           state: RouterStateSnapshot ): Observable<boolean> {

           // Fetch the data with http request
    return this.coursesService.getAll()
      .pipe(
        map(courses => !!courses)
      );
  }

}
