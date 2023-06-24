import axios from 'axios'

import ApiBase from './api-base'

export default class ExamItemApi extends ApiBase {
  constructor() {
    super('examitems');
  }

  getByExamId = (examId: number, page: number, limit: number) => {
    const url = `${this.baseApiUrl}/GetByExamId/${examId}/${page}/${limit}`;
    const response = axios.get(url);
    return response;
  };
}
