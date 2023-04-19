import EntityBase from './EntityBase';

export default interface Answer extends EntityBase {
  isCorrect: boolean;
  content: string;
  order: number;
  questionId: number;
  parentQuestionId: number;
  explain: string;
};