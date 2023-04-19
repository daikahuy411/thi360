import EntityBase from './EntityBase';

export default interface LessonPlanComment extends EntityBase{
    lessonId: number;
    content: string;
    status: number;
};