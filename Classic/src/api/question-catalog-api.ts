import ApiBase from './api-base';
import axios from 'axios';

export default class QuestionCatalogApi extends ApiBase {
  constructor() {
    super('questioncatalogs');
  }
}
