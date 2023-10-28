import axios from 'axios'

import ApiBase from './api-base'

class V1Api extends ApiBase {
  constructor() {
    super('v1')
  }

  getRecentExams = () => {
    const url = `${this.baseApiUrl}/recentexams`
    const response = axios.get(url)
    return response
  }

  getProgramCatalogs = () => {
    const url = `${this.baseApiUrl}/programcatalogs`
    const response = axios.get(url)
    return response
  }

  getHomePagePosts = () => {
    const url = `${this.baseApiUrl}/homepageposts`
    const response = axios.get(url)
    return response
  }

  getProgramCatalog = (id: number) => {
    const url = `${this.baseApiUrl}/programcatalogs/${id}`
    const response = axios.get(url)
    return response
  }

  getSubjectCatalog = (programId: number, id: number) => {
    const url = `${this.baseApiUrl}/subjectcatalogs/${programId}/${id}`
    const response = axios.get(url)
    return response
  }

  getCurriculums = (programId: number, subjectId: number) => {
    const url = `${this.baseApiUrl}/programcatalogs/${programId}/subjectcatalogs/${subjectId}`
    const response = axios.get(url)
    return response
  }

  searchExams = (query: any) => {
    const url = `${this.baseApiUrl}/searchExams`
    const response = axios.post(url, query)
    return response
  }

  getExam = (examId: number) => {
    const url = `${this.baseApiUrl}/exams/${examId}`
    const response = axios.get(url)
    return response
  }

  getPromotions = () => {
    const url = `${this.baseApiUrl}/Promotions`
    const response = axios.get(url)
    return response
  }

  getPricingPlans = () => {
    const url = `${this.baseApiUrl}/pricingplans`
    const response = axios.get(url)
    return response
  }

  createOrder = (planId: number, month: number) => {
    const url = `${this.baseApiUrl}/Orders`
    const response = axios.post(url, { planId: planId, month: month })
    return response
  }

  completeOrder = (id: number) => {
    const url = `${this.baseApiUrl}/CompleteOrder`
    const response = axios.post(url, { id: id })
    return response
  }
}

export default V1Api
