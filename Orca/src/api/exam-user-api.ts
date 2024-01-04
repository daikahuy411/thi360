import axios from 'axios'

import ApiBase from './api-base'

export default class ExamUserApi extends ApiBase {
  constructor() {
    super('examusers')
  }

  addUsersToExam = (examId: number, userIds: number[]) => {
    const response = axios.post(this.baseApiUrl, {
      examId: examId,
      userIds: userIds
    })
    return response
  }

  searchesExamUsersByExam = (examId: number, keyword: string, page: number, limit: number) => {
    return axios.post(this.baseApiUrl + '/SearchesExamUsers', {
      examId: examId,
      keyword: keyword,
      page: page,
      limit: limit
    })
  }

  getExamAttemptsHistory = (examId: number, userId: string) => {
    return axios.get(this.baseApiUrl + '/GetExamAttemptsHistory/' + examId + '/' + userId)
  }
}
