import EntityBase from './EntityBase'

export default interface Answer extends EntityBase {
  isCorrect: boolean;
  content: string;
  order: number;
  questionId: number;
  group: number;
  parentQuestionId: number;
  explain: string;
  errors?: any;
};