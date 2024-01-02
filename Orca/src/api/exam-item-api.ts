import axios from 'axios'

import ApiBase from './api-base'

export default class ExamItemApi extends ApiBase {
  constructor() {
    super('examitems')
  }

  getByExamId = (examId: number, page: number, limit: number) => {
    const url = `${this.baseApiUrl}/GetByExamId/${examId}/${page}/${limit}`
    const response = axios.get(url)
    return response
  }

  addTestsToExamItem = (examId: number, itemId: number, testIds: number[]) => {
    const url = `${this.baseApiUrl}/AddTestsToExamItem`
    const response = axios.post(url, {
      examId: examId,
      itemId: itemId,
      testIds: testIds
    })
    return response
  }

  removeTestsFromExamItem = (examId: number, itemId: number, testIds: number[]) => {
    const url = `${this.baseApiUrl}/RemoveExamTests`
    const response = axios.post(url, {
      examId: examId,
      itemId: itemId,
      testIds: testIds
    })
    return response
  }
}
