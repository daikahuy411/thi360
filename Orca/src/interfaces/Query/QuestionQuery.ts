import BaseQuery from "./BaseQuery";

export default interface QuestionQuery extends BaseQuery {
  CategoryIds: Array<string>;
}
