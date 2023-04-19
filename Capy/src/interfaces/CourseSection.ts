import EntityBase from './EntityBase';
import CourseLecture from './CourseLecture';

export default interface CourseSection extends EntityBase{
    Lectures?: Array<CourseLecture>;
    CourseId: number;
    Order: number;
};