import axios from 'axios'

import ApiBase from './api-base'

export default class FileApi extends ApiBase {
  constructor() {
    super('files')
  }

  uploadFile = (model: any) => {
    const response = axios.post(`${this.baseApiUrl}/upload`, model)
    return response
  }

  deleteFile = (model: any) =>{
    const response = axios.delete(`${this.baseApiUrl}`, model)
    return response
  }
}
