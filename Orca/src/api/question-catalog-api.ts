import axios from 'axios'

import ApiBase from './api-base'

export default class QuestionCatalogApi extends ApiBase {
  constructor() {
    super('questioncatalogs')
  }

  getCatalogTree = () => {
    const url = `${this.baseApiUrl}/GetCatalogTree`
    const response = axios.post(url, { page: 1 })
    return response
  }
}
