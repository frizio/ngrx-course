import { Course } from './model/course';
import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

// Fetch all courses from the backend: this is more a COMMAND than an event ---> referenced in EFFECT
export const loadAllCourses = createAction(
  '[Courses Resolver] Load All Courses'
);

// All course fetch finished: this is more an EVENT than a command ---> referenced in REDUCER
export const allCourseLoaded = createAction(
  '[Load Courses Fetched] All Course Loaded',
  props<{courses: Course[]}>()
);

export const courseUpdated = createAction(
  // ['Source Action'] Event occour
  '"[Edit Course Dialog] Course Updated',
  // props<{type payload}>
  props<{update: Update<Course>}>()
);


