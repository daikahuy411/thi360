import Answer from './Answer'
import EntityBase from './EntityBase'

export default interface Question extends EntityBase{
  parentId: number;
  questionTypeId: number;
  categoryId: number;
  catalogId?: number;
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