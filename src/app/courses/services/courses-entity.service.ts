import { Course } from '../model/course';
import { Injectable } from '@angular/core';
import { EntityCollectionServiceElementsFactory, EntityCollectionServiceBase } from '@ngrx/data';


// Facade service that allows for example
// - manipulate directly entities in the cache,
// - fetch data from the backend,
// - generating the http request automatically,
// - saving the data in the store
// - queryying the data in the store used builin observable
// - in generate manage allo the entity state
@Injectable()
export class CourseEntityService extends EntityCollectionServiceBase<Course> {

  constructor(
    // Service that create some of the core elements to enable to build a course entity service
    private serviceElementsFactory: EntityCollectionServiceElementsFactory
  ) {

    super('Course', serviceElementsFactory);

  }

}
