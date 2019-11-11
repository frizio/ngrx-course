import { Observable } from 'rxjs';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class CoursesResolver implements Resolve<boolean> {

  resolve( route: ActivatedRouteSnapshot,
           state: RouterStateSnapshot ): Observable<boolean> {

  }

}
