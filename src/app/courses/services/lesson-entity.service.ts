import { Injectable } from '@angular/core';
import { EntityCollectionServiceElementsFactory, EntityCollectionServiceBase } from '@ngrx/data';
import { Lesson } from '../model/lesson';


@Injectable()
export class LessonEntityService extends EntityCollectionServiceBase<Lesson> {

  constructor(
    private serviceElementsFactory: EntityCollectionServiceElementsFactory
  ) {
    super('Lesson', serviceElementsFactory);
  }

}
