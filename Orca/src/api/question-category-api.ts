import axios from 'axios'

import ApiBase from './api-base'

class QuestionCategoryApi extends ApiBase {
  constructor() {
    super('questioncategories')
  }

  getByCatalog = catalogId => {
    const url = `${this.baseApiUrl}/GetByCatalog/${catalogId}`
    const response = axios.get(url)
    return response
  }
}

export default QuestionCategoryApi
