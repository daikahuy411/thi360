import EntityBase from './EntityBase';
import ExamItem from './ExamItem';
import ExamSetting from './ExamSetting';

export default interface Exam extends EntityBase{
    categoryName: string;
    categoryId: number;
    type: number;
    registrationType: number;
    isSpecificDuration: boolean;
    startDate: Date;
    endDate: Date;
    status: number;
    examItems: Array<ExamItem>;
    setting: ExamSetting;
};