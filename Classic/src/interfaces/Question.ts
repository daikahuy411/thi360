import EntityBase from './EntityBase';
import Answer from './Answer';

export default interface Question extends EntityBase{
  parentId: number;
  questionTypeId: number;
  categoryId: number;
  categoryName?: string;
  content: string;
  explain: string;
  order: number;
  totalQuestion: number;
  questionTypeName?: string;
  answers: Array<Answer>;
  children?: Array<Question>;
  rawContent?: string;
  contentFormat?: 'html'| 'plain';
};