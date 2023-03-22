import EntityBase from "./EntityBase";
import CourseContent  from './CourseContent';

export default interface CourseLecture extends EntityBase {
  CourseId: number;
  ClassId: number;
  Type: number;
  Duration: number;
  Order:number;
  CourseSectionId: number;
  Content?: CourseContent;
}
