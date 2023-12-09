import axios from 'axios'

import { FolderType } from '../enum/FolderType'
import ApiBase from './api-base'

class FolderApi extends ApiBase {
  type: FolderType

  constructor(catalogType: FolderType) {
    super('folders')
    this.type = catalogType
  }

  getAll = () => {
    const url = `${this.baseApiUrl}/getall/${this.type}`
    const response = axios.get(url)
    return response
  }
}

export default FolderApi
