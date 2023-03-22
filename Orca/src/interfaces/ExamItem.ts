import EntityBase from './EntityBase';

export default interface ExamItem extends EntityBase{
    examId: number;
    testGroupId: number;
    numberOfTest    : number;
    duration: number;
    startDate: Date;
    endDate: Date;
};