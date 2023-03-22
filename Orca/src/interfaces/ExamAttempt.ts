import EntityBase from './EntityBase';
import Exam from './Exam';

export default interface ExamAttempt extends EntityBase{
    ExamDto: Exam;
};