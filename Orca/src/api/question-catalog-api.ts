import axios from 'axios'

import ApiBase from './api-base'

export default class QuestionCatalogApi extends ApiBase {
  constructor() {
    super('questioncatalogs')
  }

  getCatalogTree = query => {
    const url = `${this.baseApiUrl}/GetCatalogTree`
    const response = axios.post(url, query)
    return response
  }
}
