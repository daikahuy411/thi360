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

  getAttemptActivityReport = () => {
    const url = `${this.baseApiUrl}/attemptactivityreport`
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

  getHomePageBlocks = () => {
    const url = `${this.baseApiUrl}/homepageblocks`
    const response = axios.get(url)
    return response
  }

  getHelpPagePosts = () => {
    const url = `${this.baseApiUrl}/helppageposts`
    const response = axios.get(url)
    return response
  }

  getPost = (id: number) => {
    const url = `${this.baseApiUrl}/posts/${id}`
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

  getExamCategories = () => {
    const url = `${this.baseApiUrl}/ExamCategories`
    const response = axios.get(url)
    return response
  }

  getMyPractice = () => {
    const url = `${this.baseApiUrl}/MyPractice`
    const response = axios.post(url, { keyword: '' })
    return response
  }

  getMyAssignment = () => {
    const url = `${this.baseApiUrl}/MyAssignment`
    const response = axios.post(url, { keyword: '' })
    return response
  }

  getCurrentUserPlans = () => {
    const url = `${this.baseApiUrl}/GetCurrentUserPlans`
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

  verifyCodePromotion = (request: any) => {
    const url = `${this.baseApiUrl}/VerifyCodePromotions`
    const response = axios.post(url, request)
    return response
  }

  getPricingPlans = () => {
    const url = `${this.baseApiUrl}/pricingplans`
    const response = axios.get(url)
    return response
  }

  getOrderHistory = request => {
    const url = `${this.baseApiUrl}/Orders`
    const response = axios.get(url, request)
    return response
  }

  createOrder = request => {
    const url = `${this.baseApiUrl}/Orders`
    const response = axios.post(url, request)
    return response
  }

  completeOrder = (request: any) => {
    const url = `${this.baseApiUrl}/CompleteOrder`
    const response = axios.post(url, request)
    return response
  }

  cancelOrder = (param: any) => {
    const url = `${this.baseApiUrl}/CancelOrder`
    const response = axios.post(url, param)
    return response
  }

  updateProfile = (request: any) => {
    const url = `${this.baseApiUrl}/UpdateProfile`
    const response = axios.put(url, request, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    return response
  }

  me = () => {
    return axios.get(this.baseApiUrl + '/me')
  }

  requestEmailConfirmed = () => {
    return axios.post(this.baseApiUrl + '/requestEmailConfirmed')
  }

  sendActiveCodeEmail = () => {
    return axios.post(this.baseApiUrl + '/SendActiveCodeEmail')
  }

  verifyExpiteTime = (token: any) => {
    return axios.get(this.baseApiUrl + '/check-expire-time/' + token)
  }

  requestForgotPassword = (request: any) => {
    return axios.post(this.baseApiUrl + '/request-forgot-password', request)
  }
  
  resetPassword = (request: any) => {
    return axios.post(this.baseApiUrl + '/reset-password/', request)
  }

  updateTenant = (tenant: any) => {
    return axios.post(this.baseApiUrl + '/UpdateTenant', tenant)
  }

  getTenant = () => {
    return axios.get(this.baseApiUrl + '/Tenant')
  }

  requestBecomeTeacher = () => {
    return axios.post(this.baseApiUrl + '/RequestBecomeTeacher')
  }

  getTenantUsage = () => {
    return axios.get(this.baseApiUrl + '/GetTenantUsage')
  }

  getExamAttemptWeekly = () => {
    return axios.get(this.baseApiUrl + '/GetExamAttemptWeekly')
  }

  getRecentUserExamAttempt = () => {
    return axios.get(this.baseApiUrl + '/GetRecentUserExamAttempt')
  }

  getEmail = (token: string) => {
    return axios.get(this.baseApiUrl + '/fetch-email/' + token)
  }
}

export default V1Api
