import { Course } from './../model/course';

export interface CoursesState {

  // Natural store
  // courses: Course[]

  // Entity format
  entities: { [key: number]: Course }; // Map
  ids: number[];  // Define the order

}
