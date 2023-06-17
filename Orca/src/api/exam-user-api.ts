import axios from 'axios'

import ApiBase from './api-base'

export default class ExamUserApi extends ApiBase {
  constructor() {
    super("examusers");
  }

  addUsersToExam = (examId: number, userIds: number[]) => {
    const response = axios.post(this.baseApiUrl, {
      examId: examId,
      userIds: userIds,
    });
    return response;
  };

  getExamUsersByExam = (examId: number, page: number, limit: number, orgId: number = 0) => {
    return axios.get(this.baseApiUrl + "/GetExamUsersByExam/" + examId + "/" + orgId + "/" + page + "/" + limit);
  };

  getExamAttemptsHistory = (examId: number, userId: string) => {
    return axios.get(this.baseApiUrl + "/GetExamAttemptsHistory/" + examId + "/" + userId);
  };
}
