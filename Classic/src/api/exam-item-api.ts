import ApiBase from './api-base';
import axios from "axios";

export default class ExamItemApi extends ApiBase {
  constructor() {
    super('examitems');
  }

  getByExamId = (examId: number) => {
    const url = `${this.baseApiUrl}/GetByExamId/${examId}`;
    const response = axios.get(url);
    return response;
  };
}
