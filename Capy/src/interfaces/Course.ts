import EntityBase from './EntityBase';
import CourseSection from './CourseSection';

export default interface Course extends EntityBase{
    Avatar?: string;
    ShortDescription?: string;
    Description?: string;
    Sections?: Array<CourseSection>;
};